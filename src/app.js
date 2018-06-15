import express from "express";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import jwt from "express-jwt";
import bodyParser from "body-parser";
import schema from "./db";

const GRAPHQL_PORT = process.env.PORT || 4000;

const graphQLServer = express();
// cors
// enable cors
var corsOptions = {
  origin: "<insert uri of front-end domain>",
  credentials: true // <-- REQUIRED backend setting
};
graphQLServer.use(cors());
// allow all request
// authentication middleware
const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  requestProperty: "auth",
  credentialsRequired: false
});
// graphQLServer.use(authMiddleware);
graphQLServer.use(
  "/graphql",
  jwt({
    secret: "shhhhhhared-secret",
    requestProperty: "auth",
    credentialsRequired: false
  })
);

graphQLServer.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => {
    console.log(">>> graphql.user", req.user);
    return { schema };
  })
);

graphQLServer.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
// graphQLServer.use("/", function(req, res) {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });
graphQLServer.listen(GRAPHQL_PORT, () =>
  console.info(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
