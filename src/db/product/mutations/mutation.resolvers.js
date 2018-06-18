import productModel from "../product.model";

export const createProduct = (root, args) => {
  console.info(args);
  return productModel
    .create(args.input)
    .then(doc => {
      return doc;
    })
    .catch(err => {
      console.error(err);
    });
};
export const updateProduct = (root, args) => {
  console.info(root, args);
  return productModel
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
