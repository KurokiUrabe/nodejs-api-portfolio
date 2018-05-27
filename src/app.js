import express from "express";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import schema from "./schema";
import mongoose from "mongoose";
import bluebird from "bluebird"; //better promises
mongoose.Promise = bluebird; // replase promise

mongoose.connect("mongodb://localhost/apis");
console.info("Mongoose state", mongoose.connection.readyState);
const GRAPHQL_PORT = process.env.PORT || 3000;

const graphQLServer = express();
graphQLServer.use(cors());
graphQLServer.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// graphQLServer.use("/", function(req, res) {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });
graphQLServer.listen(GRAPHQL_PORT, () =>
  console.info(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
