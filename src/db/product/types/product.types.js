const typeDefs = `
  type Query {
    getProduct(_id:String):Product
    allProducts:[Product]
  }
  type Mutation {
    createProduct(input: inputProduct): Product
    updateProduct(_id:String,input: inputProduct): Product
  }
  input inputProduct{
    name: String
    rating: Int
    start: String
    description: String
    measueres: inputMeasures
    price: inputPrice
    salient_point:[String]
    brand: String
    img: String

  }
  input inputMeasures {
    weight: Float
    large: Float
    height: Float
    width: Float
  }
  input inputPrice {
    net: Float
    brute: Float
  }
  type Product{
    name: String
    rating: Int
    start: String
    description: String
    measueres:Measures
    price:Price
    salient_point:[String]
    brand: String
    img: String

  }
  type Measures {
    weight: Float
    large: Float
    height: Float
    width: Float
  }
  type Price {
    net: Float
    brute: Float
  }
`;

export default typeDefs;
