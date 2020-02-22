const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true
};

const NewsEntrySchema = new Schema(
  {
    title: requiredString,
    content: requiredString
  },
  {
    timestamps: true
  }
);

const NewsEntry = mongoose.model("NewsEntry", NewsEntrySchema);

module.exports = NewsEntry;
