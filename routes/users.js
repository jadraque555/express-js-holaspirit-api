var express = require('express');
var router = express.Router();
var authenticate = require("../middleware/authentication");

/* GET users listing. */
router.get('/', authenticate, async (req, res, next) => {
  const response = await fetch("https://app.holaspirit.com/api/me", {
    method: "GET",
    headers: { "Content-Type": "application/json", "authorization": "Bearer "+req.session.auth.access_token },
  });

  const result = await response.json();
  req.session.user = result;
  res.render('users', { user: result });
});

/** Logout destroy all session */
router.get('/logout', async (req, res, next) => {

  req.session.destroy((err) => {
    if (err) {
        console.log(err)
        return next(err)
    }

    return res.redirect("/")
  })
});

module.exports = router;
