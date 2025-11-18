const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/UserRoutes");
const postRoutes = require("./Routes/PostRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

mongoose
  .connect(process.env.DATABASE_CONNECT)
  .then(() => {
    console.log("data base is connected .....");
    app.listen(process.env.PORT, () => {
      console.log(`Server Running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
