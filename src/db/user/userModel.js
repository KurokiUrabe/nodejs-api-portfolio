// The User model
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import secureRandom from "secure-random";

import jwt from "jsonwebtoken";
var Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
// these values can be whatever you want - we're defaulting to a
// max of 5 attempts, resulting in a 2 hour lock
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000;

// Funcion para validar email
const validateEmail = email =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      // unique: true,
      required: "Email address is required",
      // validate: [validateEmail, 'Please fill a valid email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ]
    },
    username: { type: String, required: true /* , unique: true */ },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
      age: Number,
      website: String
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
// define
const reasons = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
};
userSchema.statics.failedLogin = reasons;
userSchema.statics.getAuthenticated = function(username, password, cb) {
  this.findOne({ username: username }, function(err, user) {
    if (err) return cb(err);

    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND);
    }

    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function(err) {
        if (err) return cb(err);
        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }

    // test for a matching password
    user.comparePassword(password, function(err, isMatch) {
      if (err) return cb(err);

      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
        // reset attempts and lock info
        var updates = {
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        };
        return user.update(updates, function(err) {
          if (err) return cb(err);
          return cb(null, user);
        });
      }

      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function(err) {
        if (err) return cb(err);
        return cb(null, null, reasons.PASSWORD_INCORRECT);
      });
    });
  });
};

userSchema.statics.gatoTote = function(username, password) {
  let supapass = password;
  return this.findOne({ username: username }).then(user => {
    if (user) {
      return user.comparePassword(password).then(isMatch => {
        if (!isMatch) return false;
        return genToken(user, password);
      });
    }
    return false;
  });
};

const genToken = (user, password) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET
  );
  return token;
};

/* const actionAfter = function(err, isMatch) {
      
  if (err) return cb(err);
  console.log("compare password");
  
  // check if the password was a match
  if (isMatch) {
    // if there's no lock or failed attempts, just return the user
    if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
    // reset attempts and lock info
    var updates = {
      $set: { loginAttempts: 0 },
      $unset: { lockUntil: 1 }
    };
    return user.update(updates, function(err) {
      if (err) return cb(err);
      return cb(null, user);
    });
  }

  // password is incorrect, so increment login attempts before responding
  user.incLoginAttempts(function(err) {
    if (err) return cb(err);
    return cb(null, null, reasons.PASSWORD_INCORRECT);
  });
}; */

userSchema.statics.getAuthenticatedSync = function(username, password, cb) {
  this.findOne({ username: username }).then(user => {
    // make sure the user exists
    if (!user) {
      return rej(reasons.NOT_FOUND);
    }

    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function(err) {
        if (err) return cb(err);
        return cb(null, null, reasons.MAX_ATTEMPTS);
      });
    }

    // test for a matching password
    user.comparePassword(password).then(isMatch => isMatch);
  });
};

userSchema.virtual("isLocked").get(function() {
  // check for a future lockUntil timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.methods.incLoginAttempts = function(user) {
  return new Promise((res, rej) => {
    let updates = {};
    if (user.lockUntil && user.lockUntil < Date.now()) {
      updates = {
        $inc: { loginAttempts: 1 },
        $unset: { lockUntil: 1 }
      };
    }
    // otherwise we're incrementing
    updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !user.isLocked) {
      updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    res(user.update(updates));
  });
};

userSchema.pre("save", function(next) {
  if (!user.password) next();
  let password = this.password;

  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(password, salt);

  this.password = hash;
  next();
});

userSchema.pre("update", function(next) {
  let password = this._update["$set"].password;

  if (!password) next();

  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(password, salt);

  this._update["$set"].password = hash;
  next();
});

userSchema.method("comparePasswordSync", function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
});
userSchema.method("comparePassword", function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
});
userSchema.method("meow", function() {
  console.log("meeeeeoooooooooooow");
});
export default mongoose.model("user", userSchema);
