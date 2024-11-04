const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { config } = require("dotenv");
const UserRouter = require("./routes/userRoutes");

app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

require("dotenv").config();
require("./db/config");
const PORT = process.env.PORT || 8080;

app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
