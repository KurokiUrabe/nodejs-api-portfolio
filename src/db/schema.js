//@flow
/**
 * The combined schema out of types and resolvers (queries, mutations and subscriptions)
 */
//$FlowFixMe
const {
  mergeSchemas,
  addSchemaLevelResolveFunction,
  addResolveFunctionsToSchema
} = require("graphql-tools");
const debug = require("debug")("api:resolvers");
const logExecutions = require("graphql-log")({
  logger: debug
});
import { merge } from "lodash";
//$FlowFixMe

import UserError from "./utils/UserError";

import { userSchema, userQueries, userMutations } from "./user";
import { employerSchema, employerQueries, employerMutations } from "./employer";
import { productSchema, productQueries, productMutations } from "./product";

const resolvers = merge(
  {},
  //queries
  userQueries,
  employerQueries,
  productQueries,
  // mutations
  userMutations,
  employerMutations,
  productMutations
  // subscriptions
);

if (process.env.NODE_ENV === "development" && debug.enabled) {
  logExecutions(resolvers);
}

// Create the final GraphQL schema out of the type definitions
// and the resolvers
const schema = mergeSchemas({
  schemas: [userSchema, employerSchema, productSchema]
});
addResolveFunctionsToSchema({ schema, resolvers });

if (process.env.REACT_APP_MAINTENANCE_MODE === "enabled") {
  console.error("\n\n⚠️ ----MAINTENANCE MODE ENABLED----⚠️\n\n");
  addSchemaLevelResolveFunction(schema, () => {
    throw new UserError(
      "We're currently undergoing planned maintenance. We'll be back by 3pm UTC, please check https://twitter.com/withspectrum for ongoing updates!"
    );
  });
}

export default schema;
