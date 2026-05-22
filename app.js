const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
require("dotenv").config();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } = process.env;
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require("./routes/index");
const errorHandler = require('./middlewares/error-handler');


const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connectDB")
  })
  .catch(console.error);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
