import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import Db from '../models/db';
import * as settings from '../settings';

// Simple function to authenticate the user in the request
export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// Initiate passport middleware and define the strategy
passport.use(
  new Strategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // Create new user based on profile, or find if it already exists
      console.log('profile');
      Db.models.User.findOrCreate({
        where: { googleId: profile.id },
      }).then((user) => done(null, user[0]));
    }
  )
);

// Serialize user by extracting the googleId from request
passport.serializeUser(function (user, done) {
  done(null, user.googleId);
});

// Deserialize user by obtaining the user instance from PK
passport.deserializeUser(function (id, done) {
  Db.models.User.findByPk(id).then((user) => {
    done(null, user);
  });
});
