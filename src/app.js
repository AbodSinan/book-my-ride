import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import rootSchema from './schema/rootSchema';
import * as settings from './settings';

// Config
const APP_PORT = 3000;

passport.use(
  new GoogleStrategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: 'http://yourdomain:3000/auth/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) =>
        done(err, user)
      );
    }
  )
);

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: rootSchema,
    pretty: true,
    graphiql: true,
  })
);

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/graphql');
  }
);

app.configure(() => {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
