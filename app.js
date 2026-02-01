const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT = 3001, MONGODB_URI } = process.env;

const mainRouter = require("./routes/index");

const app = express();

app.use(express.json()); // ✅ put BEFORE routes

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(console.error);


const routes = require("./routes")   
app.use(routes)

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
