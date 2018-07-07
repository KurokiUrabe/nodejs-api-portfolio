const typeDefs = `
  type Query {
    getProduct(_id:String):Product
    allProducts(limit:Int,skip:Int):[Product]
  }
  type Mutation {
    createProduct(input: inputProduct): Product
    updateProduct(_id:String,input: inputProduct): Product
  }
  type Product{
    _id: String
    sku: String
    clave: String
    type: String
    asin: String
    name: String
    rating: Int
    start: String
    description: String
    shipping:Shipping
    pricing: Pricing
    brand: String
    img: String
    detail: Detail
  }
  input inputProduct {
    name: String
    rating: Int
    clave:String
    start: String
    description: String
    shipping: inputShipping
    pricing: inputPricing
    salient_point:[String]
    brand: String
    img: String
    detail:inputDetail

  }
  type Detail {
    name:String
    salient_point:[String]

  }
  input inputDetail {
    name:String
    salient_point:[String]

  }
  type Pricing {
    list: Float
    retail: Float
    savings: Float
    pct_savings: Float
  }
  input inputPricing {
    list: Float
    retail: Float
    savings: Float
    pct_savings: Float
  }


  type Shipping {
    weight: Float
    dimensions: Dimensions
  }
  input inputShipping {
    weight: Float
    dimensions: inputDimensions
  }
  type Dimensions {
    width: Float
      height: Float
      depth: Float
  }
  input inputDimensions {
    width: Float
      height: Float
      depth: Float
  }


  
`;

export default typeDefs;
