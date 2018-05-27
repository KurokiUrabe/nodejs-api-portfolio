// @flow
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
// types
import typeDefs from "./types";

// queries
import employerQueries from "./queries";

// schema

const schema = makeExecutableSchema({ typeDefs });

// console.warn(schema);
// mocks
import mocks from "./mocks";
addMockFunctionsToSchema({ schema, mocks });

// mutation
import employerMutations from "./mutations";
// const employerQueries = {};
const employerSchema = schema;

module.exports = {
  employerSchema,
  employerQueries,
  employerMutations
};
