const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { notFound, errorHandler }= require("./error_handlers/middleware");
const mongoose = require("mongoose");
const news = require('./api/news')

require("dotenv").config();

const app = express();

try {
  mongoose.connect(
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log("connected to mongo...")
  );
} catch (error) {
  console.log("this is catch", error);
}


// console.log('this is process ', process.env.DATABASE_URL)
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!"
  });
});

app.use("/api/news", news)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 4444;

app.listen(port, () => console.log("Listening at port...", port));
