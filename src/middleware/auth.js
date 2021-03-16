import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import Db from '../models/db';
import * as settings from '../settings';

export const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

passport.use(
  new Strategy(
    {
      clientID: settings.googleClientId,
      clientSecret: settings.googleClientSecret,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      Db.models.User.findOrCreate({
        where: { googleId: profile.id },
      }).then((user) => done(null, user[0]));
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.googleId);
});

passport.deserializeUser(function (id, done) {
  Db.models.User.findByPk(id).then((user) => {
    done(null, user);
  });
});
