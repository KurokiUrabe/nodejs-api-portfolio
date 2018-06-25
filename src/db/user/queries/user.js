import userModel from "../userModel";
import bcrypt from "bcrypt";

const userSchema = new userModel();
export const user = (_, { _id }) => {
  return userModel
    .findById(_id)
    .exec()
    .then(userDoc => {
      return userDoc;
    })
    .catch(console);
};
export const users = (_, { jwt }) => {
  console.log(jwt);
  return userModel
    .find({})
    .exec()
    .then(userDoc => {
      return userDoc;
    })
    .catch(console.error);
};
