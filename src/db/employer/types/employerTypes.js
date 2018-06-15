const typeDefs = `
  type Query {
    getEmployer(_id:String):Employer
    allEmployers:[Employer]
  }
  type Mutation {
    createEmployer(input: inputEmployee): Employer
    updateEmployer(_id:String,input: inputEmployee): Employer
  }

  input inputEmployee{
    jobTitle:String
    company:String
    description:String
    period: inputPeriod
  
  }
  
  type Employer {
    _id: String
    jobTitle: String
    company: String
    description: String
    period: Period
   }
   input inputPeriod {
    start:String
    end:String
  }
   type Period {
     start:String
     end:String
   }
`;

export default typeDefs;
