// The Employer model
import mongoose from "mongoose";
var Schema = mongoose.Schema;

const employerSchema = new Schema(
  {
    jobTitle: String,
    company: String,
    description: String,
    period: {
      start: String,
      end: String
    }
  },
  { collection: "Employer" }
);

export default mongoose.model("Employer", employerSchema);
