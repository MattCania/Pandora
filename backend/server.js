require("dotenv").config();
const express = require("express");
require("express-async-errors");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
const compression = require("compression");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require("./models");

const app = express();

// Middlewares
// Backend to Frontend Connection
// Parsing Input Forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(hpp());
app.use(
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? true : false, // False in Development
  })
);

// Connects ReactJs Frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).send("Too many requests, please try again later.");
  },
});

// Apply the rate limiter to all requests
if (process.env.NODE_ENV === "production") {
  app.use("/api", limiter);
}

// Sessions
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
    cookie: {
      secure: process.env.NODE_ENV === "production" ? true : false, // Set false in Development
      maxAge: 24 * 60 * 60 * 1000, // 1 Day
    },
  })
);

sequelize
  // .sync()
  // .sync({ force: true })
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully!");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });

// Token Middleware
const csrfToken = require('./middleware/token')

app.use('/api', csrfToken)

// Routes and Controllers
const recordsRoute = require("./routes/records");
const loginRoute = require("./routes/login");
const sessionRoute = require("./routes/session");
const registerRoute = require("./routes/register");
const recoveryRoute = require("./routes/recovery");
const userRoute = require("./routes/profile");
const transactionRoute = require('./routes/transactions')
const accountRoute = require('./routes/accounts')
const imageRoute = require('./routes/profileImage')

app.use('/api', imageRoute)
app.use('/api', accountRoute)
app.use("/api", userRoute);
app.use("/api", recordsRoute);
app.use("/api", loginRoute);
app.use("/api", sessionRoute);
app.use("/api", registerRoute);
app.use("/api", recoveryRoute);
app.use("/api", transactionRoute)


// Localhost port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Connected at Port ${port}`);
});
