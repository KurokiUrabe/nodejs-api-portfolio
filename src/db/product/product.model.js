// The product model
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    jobTitle: String,
    company: String,
    description: String,
    period: {
      start: String,
      end: String
    }
  },
  { collection: "product" }
);

export default mongoose.model("product", productSchema);
