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
          .insert([{ anonHash: newHash }])
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
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
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
