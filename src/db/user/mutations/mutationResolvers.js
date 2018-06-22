import * as mongoose from "mongoose";
import userModel from "../userModel";
import * as authentication from "../../utils/authentication";
import { addErrorLoggingToSchema } from "graphql-tools";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = (root, args) => {
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
  const token = userModel.gatoTote(username, password).then(value => {
    console.log(value);
  });
  /*  userModel.getAuthenticatedSync(username,password)
  .then(function(err, user, reason) {
    if (err) throw err;
    // login was successful if we have a user
    if (user) {
        // handle login success
        console.log('login success');
        // create jwt
        const token = jwt.sign({
          id: user.id,
          email: user.email,
        }, JWT_SECRET);
        user.jwt = token;
        return user;
    }
    
    // otherwise we can determine why we failed
    var reasons = userModel.failedLogin;
    
    switch (reason) {
        case reasons.NOT_FOUND:
        case reasons.PASSWORD_INCORRECT:
            console.error("NOT_FOUND/PASSWORD_INCORRECT");
            
            // note: these cases are usually treated the same - don't tell
            // the user *why* the login failed, only that it did
            break;
        case reasons.MAX_ATTEMPTS:
            console.error("MAX_ATTEMPS");
            
            // send email or otherwise notify user that account is
            // temporarily locked
            break;
    }
  }) */
  console.log("token", token);

  return null;
};
