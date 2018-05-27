import employerModel from "../employerModel";

export const createEmployer = (root, args) => {
  console.info(args);
  return employerModel
    .create(args)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      console.error(err);
    });
};
