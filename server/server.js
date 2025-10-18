const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();
require("dotenv").config();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/", require("./routes/root"));
app.use("/posts", require("./routes/api/posts"));

app.listen(process.env.PORT, () => {
  console.log("Server is currenly running");
});
