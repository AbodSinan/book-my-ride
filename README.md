# Book My Car

## Introduction
"book my car" is a simple API that can be used to query and manipulate data regarding **cars**, **bookings** and **users**

The program uses a [GraphQL-style](https://graphql.org/) API with a very streamlined approach. The database is managed by the [Sequelize ORM](https://sequelize.org/)
Authentication is done using [PassportJS](http://www.passportjs.org/) and [Google OAuth2.0](https://github.com/jaredhanson/passport-google-oauth2)

## Usage

- The test can be run my simple cloning the git repo and running `yarn start` in the source file. Which should run a local instance of the App.
- Got to **{{URL}}/auth/google** and log-in to your account to get access to the **/graphql** endpoint.
- Once that's done, you can proceed to the wonderful GraphiQL interface that has the documentation available of all queries and mutations.
- A [Postman collection](https://www.getpostman.com/collections/2af0f759b83ae7ca5bbd) is available for the API, you will still have to do authentication as in the 2nd point and add the cookies to the header.
