import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Strategy } from 'passport-google-oauth2';
import passport from 'passport';
import * as settings from './settings';
import rootSchema from './schema/rootSchema';

// Config
const APP_PORT = 3000;

export const app = express();

passport.use(
  new Strategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

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
