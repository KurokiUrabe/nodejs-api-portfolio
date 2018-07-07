// The product model
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: String,
    rating: Number,
    start: String,
    clave: String,
    sku: String,
    type: String,
    asin: String,
    description: String,
    shipping: {
      weight: Number,
      dimensions: {
        width: Number,
        height: Number,
        depth: Number
      }
    },
    pricing: {
      list: Number,
      retail: Number,
      savings: Number,
      pct_savings: Number
    },
    price: {
      net: Number,
      brute: Number
    },
    detail: {
      title: String,
      salient_point: [String]
    },
    brand: String,
    img: String
  },
  { collection: "product" }
);

export default mongoose.model("product", productSchema);
