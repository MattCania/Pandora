const express = require('express')
const router = express.Router()
const csurf = require("csurf");

const csurfProtection = csurf({ cookie: true });

router.get('/csurf-token',  csurfProtection, (req, res, next) => {

	res.json({ csrfToken: req.csrfToken() });

})

module.exports = router