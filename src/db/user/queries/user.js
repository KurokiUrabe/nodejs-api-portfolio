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
export const users = () => {
  return userModel
    .find({})
    .exec()
    .then(userDoc => {
      return userDoc;
    })
    .catch(console.error);
};

export const validateCredential = (_, { data }) => {
  const username = data.username;
  const password = data.password;
  return userModel.findOne({ username: username }, function(err, user) {
    if (err) throw err;

    if (!user) {
      // Return if user not found in database
      return {
        message: "User not found"
      };
    }

    user.comparePassword("password", function(err, isMatch) {
      if (err) throw err;
      console.log("password:", isMatch); // -> Password123: true
    });
  });
};
