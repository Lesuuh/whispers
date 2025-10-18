const allowedOrigins = [
  "https://localhost:3000",
  "https://anon-blog-full-stack.vercel.app/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Access not allowed by Cors"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
