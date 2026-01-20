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
