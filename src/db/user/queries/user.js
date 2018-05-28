import userModel from "../userModel";
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
