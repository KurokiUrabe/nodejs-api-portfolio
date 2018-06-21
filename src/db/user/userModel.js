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
  if (!this.password) next();
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

// userSchema.method('comparePassword', function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//   });
// });
userSchema.method("meow", function() {
  console.log("meeeeeoooooooooooow");
});
export default mongoose.model("user", userSchema);
