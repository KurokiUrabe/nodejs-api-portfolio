import productModel from "../product.model";
export const getProduct = (_, { _id }) => {
  return productModel
    .findById(_id)
    .exec()
    .then(productDoc => {
      return productDoc;
    })
    .catch(err => console.error(err));
};
export const allProducts = (_, { limit, skip }) => {
  return productModel
    .find({})
    .skip(validSkip(skip))
    .limit(validLimit(limit))
    .exec()
    .then(productDoc => {
      return productDoc;
    })
    .catch(err => console.error(err));
};

const validLimit = limit => {
  if (limit && limit > 0) {
    if (limit > 40) {
      return 40;
    }
    return limit;
  }
  return 10;
};
const validSkip = skip => {
  if (skip && skip > 0) {
    return skip;
  }
  return 0;
};
