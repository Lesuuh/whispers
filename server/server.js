const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");


const app = express();
require("dotenv").config();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



// routes
app.use("/", require("./routes/root"));
app.use("/posts", require("./routes/api/posts"));

app.listen(process.env.PORT, () => {
  console.log("Server is currenly running");
});
