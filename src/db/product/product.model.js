// The product model
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    rating: Number,
    start: String,
    description: String,
    measueres: {
      weight: Number,
      large: Number,
      height: Number,
      width: Number
    },
    price: {
      net: Number,
      brute: Number
    },
    salient_point: [String],
    brand: String,
    img: String
  },
  { collection: "product" }
);

export default mongoose.model("product", productSchema);
