const express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Could not clear session");
    res.send("Session Cleared");
  });
});

module.exports = router;
