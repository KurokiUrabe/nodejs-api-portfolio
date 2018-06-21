import * as mongoose from "mongoose";
import userModel from "../userModel";
import * as authentication from "../../utils/authentication";

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

export const updateUser = (root, args) => {
  return userModel
    .update({ _id: args._id }, { $set: args.data })
    .then(() => userModel.findById(args._id));
};

export const getSessionToken = (_, { data }) => {
  const username = data.username;
  const password = data.password;
  console.log("meow", userModel);

  userModel.meow();

  return null;
};
