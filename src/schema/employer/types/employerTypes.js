const typeDefs = `
  type Query {
    employer(_id:String):Employer
    allEmployers:[Employer]
  }
  type Mutation {
    createEmployer(
      name:String,
      employername:String,
      password:String
    ): Employer
  }
  type Employer {
    _id: String
    jobTitle: String
    company: String
    description: String
    period: Period
   }
   type Period {
     start:String
     end:String
   }
`;

export default typeDefs;
