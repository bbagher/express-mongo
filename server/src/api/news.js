const { Router } = require("express");
const NewsEntry = require("../models/NewsEntry");
const http = Router();

http.get("/", async (req, res, next) => {
  try {
    const entries = await NewsEntry.find();
    console.log("👀", entries);
    res.json(entries);
  } catch (error) {
    res.status(422);
    console.log("🚧", error);
    return next(error);
  }
});

http.post("/", async (req, res, next) => {
  try {
    const newsEntry = new NewsEntry(req.body);
    const createdEntry = await newsEntry.save();
    console.log("📎", req.body);
    res.json(createdEntry);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
      console.log("🔎", error.name);
    }
    next(error);
  }
});

module.exports = http;
