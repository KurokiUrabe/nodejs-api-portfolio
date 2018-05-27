// @flow
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
// types
import typeDefs from "./types";

// queries
import userQueries from "./queries";

// schema

const schema = makeExecutableSchema({ typeDefs });

// console.warn(schema);
// mocks
import mocks from "./mocks";
addMockFunctionsToSchema({ schema, mocks });

// mutation
import userMutations from "./mutations";
// const userQueries = {};
const userSchema = schema;

module.exports = {
  userSchema,
  userQueries,
  userMutations
};
