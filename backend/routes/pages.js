const express = require("express");
const isAuthenticated = require("../middleware/authenticator");
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/user-login");
});

router.get("/user-login", (req, res) => {
	let username
	if (req.session.userId) {
		username = req.session.username
	}

	res.render("login.ejs", { loggedUser: username});
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

router.get("/homepage", isAuthenticated, async (req, res) => {
	const username = req.session.username;

	res.render("homepage.ejs", { username: req.session.username});
});

module.exports = router;		
