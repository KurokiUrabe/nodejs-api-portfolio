import * as mongoose from "mongoose";
import userModel from "../userModel";
// import bluebird from "bluebird";
// mongoose.Promise = bluebird;

export const createUser = (root, args) => {
  console.info(args.data);
  return userModel
    .create(args.data)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      console.error(err);
    });
};
