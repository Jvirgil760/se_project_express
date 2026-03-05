const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

mongoose
  .connect(MONGODB_URI)
  .catch(console.error);


app.listen(PORT, () => {
  // (`Server is running on port ${PORT}`);
});
