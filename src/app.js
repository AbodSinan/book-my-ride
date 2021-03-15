import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import rootSchema from './schema/rootSchema';
import * as settings from './settings';

// Config
const APP_PORT = 3000;

export const app = express();
app.use(
  '/',
  graphqlHTTP({
    schema: rootSchema,
    pretty: true,
    graphiql: true,
  })
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
