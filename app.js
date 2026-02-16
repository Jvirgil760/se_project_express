const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;

const mainRouter = require("./routes/index");

const app = express();

app.use(express.json()); // ✅ put BEFORE routes
app.use((req, res, next) => {
  req.user = {
    _id: "698ca7c56ad3550b28824314"
  };
  next();
});
app.use("/", mainRouter);

mongoose
  .connect(MONGODB_URI)
  .catch(console.error);


app.listen(PORT, () => {
  // (`Server is running on port ${PORT}`);
});
