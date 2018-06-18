// @flow
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
// types
import typeDefs from "./types";

// queries
import productQueries from "./queries";

// schema

const schema = makeExecutableSchema({ typeDefs });

// console.warn(schema);
// mocks
import mocks from "./mocks";
addMockFunctionsToSchema({ schema, mocks });

// mutation
import productMutations from "./mutations";
// const productQueries = {};
const productSchema = schema;

module.exports = {
  productSchema,
  productQueries,
  productMutations
};
