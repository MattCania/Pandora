require("dotenv").config();
const express = require("express");
require('express-async-errors');
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require("cors");
const helmet = require("helmet");
const { sequelize } = require('./models')

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({ db: sequelize }),
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
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
const port = 5000;

app.listen(port, () => {
  console.log(`Server Connected at Port ${port}`);
});
