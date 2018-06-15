import employerModel from "../employerModel";

export const createEmployer = (root, args) => {
  console.info(args);
  return employerModel
    .create(args.input)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      console.error(err);
    });
};
export const updateEmployer = (root, args) => {
  console.info(root, args);
  return employerModel
    .findByIdAndUpdate(args._id, { $set: args.input }, { new: true })
    .exec()
    .then(doc => {
      console.log(doc);

      if (doc) {
        return doc;
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const updateEmployer = (root, args) => {
  const data = args.dataEmployer;

  employerModel
    .update({ _id: data._id }, data)
    .exec()
    .then(doc => doc)
    .catch(err => {
      console.error(err);
    });
  return data;
};
