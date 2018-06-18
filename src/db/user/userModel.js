// The User model
import mongoose from "mongoose";
import bcrypt from "bcrypt";
var Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

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
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

userSchema.pre("save", function(next) {
  var user = this;
  console.log(35, user.password);

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      console.log(user.password, hash);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    // Prevent conflict btween err and isMatch
    if (err) return callback(err, null);
    callback(null, isMatch);
  });
};
userSchema.methods.comparePasswordOld = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.method("meow", function() {
  console.log("meeeeeoooooooooooow");
});

export default mongoose.model("user", userSchema);
