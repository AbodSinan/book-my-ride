import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import rootSchema from './schema/rootSchema';
import passport from 'passport';
import * as settings from './settings';

import { Strategy } from 'passport-google-oauth2';

// Config
const APP_PORT = 3000;

export const app = express();

passport.use(
  new Strategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: '/graphql',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/graphql');
  }
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootSchema,
    pretty: true,
    graphiql: true,
  })
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
