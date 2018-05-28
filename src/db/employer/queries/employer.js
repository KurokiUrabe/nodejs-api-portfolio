import employerModel from "../employerModel";
export const employer = (_, { _id }) => {
  return employerModel
    .findById(_id)
    .exec()
    .then(employerDoc => {
      return employerDoc;
    })
    .catch(err => console.error(err));
};
export const allEmployers = () => {
  return employerModel
    .find({})
    .exec()
    .then(employerDoc => {
      return employerDoc;
    })
    .catch(err => console.error(err));
};
