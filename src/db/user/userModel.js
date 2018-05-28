// The User model
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true /* , unique: true */ },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

export default mongoose.model("user", userSchema);
