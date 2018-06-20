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
    .findByIdAndUpdate(args._id, { $set: args.data }, { new: true })
    .exec()
    .then(doc => {
      if (doc) {
        return doc;
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const getSessionToken = (_, { data }) => {
  const username = data.username;
  const password = data.password;
  return userModel.findOne({ username: username }).then();
};

/* , function(err, user) {
    if (err) throw err;
    console.log(user);
    
    if (!user) {
      // Return if user not found in database
      return {
        message: "User not found"
      };
    }

    user.comparePassword("password", function(err, isMatch) {
      if (err) throw err;
      console.log("password:", isMatch); // -> Password123: true
    });} */
