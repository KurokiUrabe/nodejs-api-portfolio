/* export const comparePassword = function(candidatePassword, callback) {
  var user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    // Prevent conflict btween err and isMatch
    if (err) return callback(err, null);  
    callback(null, isMatch);
  });
}; */
import bcrypt from "bcrypt";

export const comparePassword = function(candidatePassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
      // Prevent conflict btween err and isMatch
      if (err) reject(err);
      resolve({
        password: password,
        isMatch: isMatch
      });
    });
  });
};

// first generate a random salt
export const genSalt = function(password, initsalt = 10) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(initsalt, function(err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          password: password
        });
      }
    });
  });
};

// hash the password with the salt
export const genHash = function(salt, password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, null, function(err, hash) {
      if (err) reject(err);
      resolve({
        salt: salt,
        password: password,
        hash: hash
      });
    });
  });
};
