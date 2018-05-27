// The User model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  thread: ObjectId,
  date: { type: Date, default: Date.now },
  author: { type: String, default: "Anon" },
  post: String
});

export const user = mongoose.model("user", userSchema);
