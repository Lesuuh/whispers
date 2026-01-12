/**
 * anonymousIdentityMiddleWare
 *
 * This Express middleware ensures that every user (even anonymous ones) has a unique, persistent identity.
 *
 * Workflow:
 * 1. Checks for an 'anon_token' cookie in the request. If missing, generates a new random token.
 * 2. Hashes the token using HMAC-SHA256 and a secret from the environment.
 * 3. Looks up the hash in the 'users' table in the database:
 *    - If found, checks if the identity is expired (older than 30 days). If expired, rotates the identity.
 *    - If not found, creates a new user with the hash.
 * 4. Attaches the user's id to req.user for downstream use.
 * 5. Sets the 'anon_token' cookie if a new token was generated or identity was rotated.
 * 6. Handles CORS preflight requests by skipping logic for OPTIONS method.
 * 7. Handles errors gracefully and logs them.
 *
 * Security:
 * - The cookie is set as httpOnly, secure = true, sameSite=None, and lasts for 30 days.
 * - All errors are logged and a 500 error is returned if identity creation fails.
 */

const crypto = require("crypto");
const supabase = require("../supabase");
const secret = process.env.ANON_SECRET;

const anonymousIdentityMiddleWare = async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    console.log("anonymousIdentity middleware called");
    // fetch the raw token from the cookie store
    let rawToken = req.cookies.anon_token;
    let isNew = false;

    // generate the token if missing
    if (!rawToken) {
      rawToken = crypto.randomBytes(32).toString("hex");
      isNew = true;
    }

    // hash the token
    const anonHash = crypto
      .createHmac("sha256", secret)
      .update(rawToken)
      .digest("hex");

    console.log(anonHash);
    console.log(isNew);
    //   then look in the database for the hash and if not found insert it
    const { data: identity } = await supabase
      .from("users")
      .select("*")
      .eq("anon_hash", anonHash)
      .maybeSingle();

    let identityData = identity;

    if (identityData) {
      const createdDate = new Date(identityData.created_at);
      const expirationDeadline = new Date();
      expirationDeadline.setDate(expirationDeadline.getDate() - 30);

      if (createdDate < expirationDeadline) {
        // id is expired
        rawToken = crypto.randomBytes(32).toString("hex");
        isNew = true;

        const newHash = crypto
          .createHmac("sha256", secret)
          .update(rawToken)
          .digest("hex");

        const { data: rotatedIdentity } = await supabase
          .from("users")
          .insert([{ anon_hash: newHash }])
          .select()
          .single();

        identityData = rotatedIdentity;
      }
    }

    // still create the user if the identity is not found,
    if (!identityData) {
      const { data: newIdentity, error: insertError } = await supabase
        .from("users")
        .insert([{ anon_hash: anonHash }])
        .select()
        .single();

      if (insertError) throw insertError;
      identityData = newIdentity;
      isNew = true;
    }

    if (!identityData || !identityData.id) {
      console.error("Failed to retrieve or create an identity.");
      return res.status(500).json({ error: "Identity creation failed" });
    }

    // attach the id to the request
    req.user = { id: identityData.id };

    // set the cookie using the raw token
    if (isNew) {
      res.cookie("anon_token", rawToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Security Error");
  }
};

module.exports = anonymousIdentityMiddleWare;
