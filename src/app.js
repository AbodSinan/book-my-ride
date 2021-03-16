import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import passport from 'passport';
import cookieSession from 'cookie-session';
import rootSchema from './schema/rootSchema';
import { isLoggedIn } from './middleware/auth';

// Config
const APP_PORT = 3000;

export const app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const root = {
  user: function (args, request) {
    return request.user;
  },
};

app.get('/login', function (req, res) {
  res.render('login');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
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
  isLoggedIn,
  graphqlHTTP({
    schema: rootSchema,
    pretty: true,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
