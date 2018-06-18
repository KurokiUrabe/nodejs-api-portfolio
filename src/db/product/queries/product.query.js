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
export const allProducts = () => {
  return productModel
    .find({})
    .exec()
    .then(productDoc => {
      return productDoc;
    })
    .catch(err => console.error(err));
};
