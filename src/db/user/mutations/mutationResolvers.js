import * as mongoose from "mongoose";
import userModel from "../userModel";
import bluebird from "bluebird";
mongoose.Promise = bluebird;

//`Hola pinche putita X${count}`;

export const createUser = (root, args) => {
  console.info(args);
  return userModel
    .create(args)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      console.error(err);
    });
};
