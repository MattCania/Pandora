require("dotenv").config();
const express = require("express");
require('express-async-errors');
const session = require("express-session");
const rateLimit = require('express-rate-limit')
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const hpp = require('hpp')
const compression = require('compression')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require('./models')

const csurfProtection = csurf({ cookie: true });
const app = express();

// Middlewares
// Backend to Frontend Connection
app.use(cors())
// Parsing Input Forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(hpp());
app.use(
  helmet({
    contentSecurityPolicy: false,   // False in Development
  })
);

// Connects ReactJs Frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false, 
});

// Apply the rate limiter to all requests
app.use(limiter);

// Sessions
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
    cookie: {
      secure: false,  // Set false in Development
      maxAge: 24 * 60 * 60 * 1000,  // 1 Day
    },
  })
);

sequelize
  .sync()
  // .sync({ force: true })
	// .sync({ alter: true })
	.then(() => {
		console.log("Database synchronized successfully!");
	})
	.catch((error) => {
		console.error("Error synchronizing the database:", error);
	});

// Csurf Protection
// app.use('/api', csurfProtection);

// Routes and Controllers
const recordsRoute = require('./routes/records')
const loginRoute = require("./routes/login");
const sessionRoute = require("./routes/session")
const registerRoute = require('./routes/register')
const recoveryRoute = require('./routes/recovery')

app.use('/api', recordsRoute)
app.use("/api", loginRoute);
app.use("/api", sessionRoute);
app.use("/api", registerRoute)
app.use("/api", recoveryRoute)

// Localhost port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Connected at Port ${port}`);
});
