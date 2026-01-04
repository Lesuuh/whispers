const allowedOrigins = ["urls"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors Error"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
