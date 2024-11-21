const express = require("express");
const isAuthenticated = require("../middleware/authenticator");
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/user-login");
});

router.get("/user-login", (req, res) => {
	res.render("login.ejs");
});

router.get("/user-register", (req, res) => {
	res.render("register.ejs");
});

router.get("/user/forgot-password", (req, res) => {
	res.render("forgotPassword.ejs");
});

router.get("/user/account-recovery", (req, res) => {
	const email = req.query.email;
	if (!email) return res.redirect("/user/forgot-password");

	res.render("accountRecovery.ejs", { email: email });
});

router.get("/homepage", isAuthenticated, (req, res) => {
	res.render("homepage.ejs", { username: req.session.username });
});

module.exports = router;
