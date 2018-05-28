const typeDefs = `
  type Query {
    user(_id:String):User
    users:[User]
    testString: String
  }
  type Mutation {
    createUser(name:String, username:String, password:String): User
  }
  type User {
    _id: String
    name: String
    username:String
    password: String
   }
 
`;

export default typeDefs;

// type User {
//   name: String,
//   username: String,
//   password: String,
//   admin: Boolean,
//   location: String,
//   meta: Meta,
//   created_at: String,
//   updated_at: String
// }
// type Meta {
//   age: Int,
//   website: String
// }
