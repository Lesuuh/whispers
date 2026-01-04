const crypto = require("crypto");
const secret = process.env.ANON_SECRET;

const anonymousIdentity = async (req, res, next) => {
  try {
    // fetch the raw token from the cookie store
    let rawToken = req.cookie.anon_token;
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
  } catch (error) {
    console.error(error);
  }
};

module.exports = anonymousIdentity;

// const crypto = require('crypto');
// const supabase = require('../lib/supabase'); // Import the client we just made

// const anonymousIdentityMiddleware = async (req, res, next) => {
//     try {
//         let rawToken = req.cookies.anon_token;
//         let isNew = false;

//         // 1. Generate token if missing
//         if (!rawToken) {
//             rawToken = crypto.randomBytes(32).toString('hex');
//             isNew = true;
//         }

//         // 2. Hash the token using your secret
//         const anonHash = crypto
//             .createHmac('sha256', process.env.ANON_SECRET)
//             .update(rawToken)
//             .digest('hex');

//         // 3. Supabase "Upsert" (Find or Create)
//         // This looks for the hash; if not found, it inserts it.
//         const { data: identity, error } = await supabase
//             .from('anonymous_identities')
//             .select('*')
//             .eq('anon_hash', anonHash)
//             .single();

//         let identityData = identity;

//         if (!identityData) {
//             const { data: newIdentity, error: insertError } = await supabase
//                 .from('anonymous_identities')
//                 .insert([{ anon_hash: anonHash }])
//                 .select()
//                 .single();

//             if (insertError) throw insertError;
//             identityData = newIdentity;
//             isNew = true;
//         }

//         // 4. Attach the internal ID to the request
//         req.user = { id: identityData.id };

//         // 5. Set/Refresh cookie
//         if (isNew) {
//             res.cookie('anon_token', rawToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'Lax', // Lax is usually better for first-party navigation
//                 maxAge: 31536000000
//             });
//         }

//         next();
//     } catch (err) {
//         console.error("Identity Middleware Error:", err);
//         next(); // Or handle error response
//     }
// };

// module.exports = anonymousIdentityMiddleware;
