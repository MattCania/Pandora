const express = require("express");
const isAuthenticated = require("../middleware/authenticator");
const recordsRouter = require("../routes/records");
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/user-login");
});

router.get("/user-login", (req, res) => {
	let username;
	if (req.session.userId) {
		username = req.session.username;
	}

	res.render("login.ejs", { loggedUser: username });
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

router.use('/api', recordsRouter)

router.get("/homepage", isAuthenticated, async (req, res) => {
	const username = req.session.username;
	const userId = req.session.userId;

	try {
		const response = await fetch(`http://localhost:5000/api/get-transactions/${userId}`);

		const data = await response.json();

		if (response.ok && data.results) {
			const result = data.results;
			res.render("homepage.ejs", { username: username, records: result });
		} else {
			console.error("Error fetching records:", data.message);
			res.status(500).send("Error fetching records");
		}
	} catch (error) {
		console.error("Error fetching records:", error.message);
		res.status(500).send("Error fetching records");
	}
});

module.exports = router;
