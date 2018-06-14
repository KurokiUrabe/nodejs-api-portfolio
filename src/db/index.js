import schema from "./schema";
import mongoose from "mongoose";
import bluebird from "bluebird"; //better promises

mongoose.Promise = bluebird; // replase promise
const DB_CONECTION = process.env.DB_DEVELOPMENT;

mongoose.connect(DB_CONECTION);
console.log("Database", DB_CONECTION);
console.info("Mongoose state", mongoose.connection.readyState);

const db = mongoose.connection;

db.on("error", () => {
  console.error("---FAILED to connect to mongoose");
});

export default schema;
