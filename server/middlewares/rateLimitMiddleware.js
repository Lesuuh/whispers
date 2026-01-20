/**
 * simpleRateLimiter
 *
 * Express middleware for basic in-memory rate limiting.
 *
 * WHY:
 * - Prevents abuse and protects endpoints from being overwhelmed by too many requests from a single user or IP.
 * - Uses anon_token cookie (if present) to uniquely identify users, otherwise falls back to IP address.
 * - In-memory store is simple and fast for small-scale or single-instance deployments.
 *
 * HOW:
 * - Tracks request counts and reset times per identifier (anon_token or IP) in a Map.
 * - If a user exceeds maxRequests within windowMs, responds with HTTP 429 and a Retry-After header.
 * - Automatically resets the counter after the window expires.
 * - Adds X-RateLimit-Limit and X-RateLimit-Remaining headers for client awareness.
 *
 * LIMITATIONS:
 * - Not suitable for distributed/multi-server environments (state is not shared).
 * - Memory usage grows with the number of unique identifiers.
 *
 * @param {number} maxRequests - Maximum allowed requests per window.
 * @param {number} windowMs - Time window in milliseconds.
 * @returns {Function} Express middleware function.
 */

const rateLimitStore = new Map();

function simpleRateLimiter(maxRequests, windowMs) {
  return (req, res, next) => {
    const now = Date.now();

    console.log("rate started");

    const identifier = req.cookies?.anon_token || req.ip;
    console.log(identifier);

    if (!rateLimitStore.has(identifier)) {
      rateLimitStore.set(identifier, {
        count: 0,
        resetTime: now + windowMs,
      });

      setTimeout(() => rateLimitStore.delete(identifier), windowMs);
    }

    const userRecord = rateLimitStore.get(identifier);

    if (now > userRecord.resetTime) {
      ((userRecord.count = 0), (userRecord.resetTime = now + windowMs));
    }

    userRecord.count++;

    if (userRecord.count > maxRequests) {
      res.setHeader(
        "Retry-After",
        Math.ceil((userRecord.resetTime - now) / 1000),
      );
      return res.status(429).json({ error: "Too many requests" });
    }

    res.setHeader("X-RateLimit-Limit", maxRequests);
    res.setHeader("X-RateLimit-Remaining", maxRequests - userRecord.count);

    console.log(rateLimitStore);
    next();
  };
}

module.exports = { simpleRateLimiter };