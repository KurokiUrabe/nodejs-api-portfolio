const typeDefs = `
  type Query {
    user(_id:String):User
    users:[User]
    testString: String
    validateCredential(data:Credential): String 
  }
  input Credential {
    username:String
    password:String
  }
  
  type Mutation {
    createUser(data:dataUser): User
    updateUser(_id:String,data:dataUser): User
  }
  input dataUser {
    name:String
    email:String
    username:String
    password:String
    email: String
    admin: Boolean
    location: String
  }
  type User {
    _id: String
    name: String
    username:String
    email: String
    admin: Boolean
    location: String
   }
 
`;

export default typeDefs;
