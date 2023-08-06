const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// env config
dotenv.config();

// router import
const userRoutes = require("./routers/usersRouters");
const blogRoutes = require("./routers/blogRouters");

// database connect
connectDB();

// react object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routers
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// listen
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
