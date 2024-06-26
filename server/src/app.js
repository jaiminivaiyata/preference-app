const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const config = require("./general-resources/config");
const { jwtStrategy } = require("./general-components/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes/v1");
const { errorHandler, pathNotFoundHandler, errorConverter } = require("./middlewares/error");

const { getClient } = require("./general-resources/db-config");
const app = express();
// to use same database session for all worker threads
app.use(session({
  secret: "some secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  store: MongoStore.create({
    clientPromise: getClient()
  })
}));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}
app.get("/", (req, res)=>{
  res.send("api running")
})
// v1 api routes
app.use("/v1", routes);

// route middlewares
// send back a 404 error for any unknown api request
app.use(pathNotFoundHandler);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
