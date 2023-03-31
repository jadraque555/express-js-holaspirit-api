var express = require('express');
var router = express.Router();
var authenticate = require("../middleware/authentication");

/* GET members listing. */
router.get('/', authenticate, async (req, res, next) => {

  const response = await fetch("https://app.holaspirit.com/api/organizations/"+req.session.user.data.organizations[0]+"/members?page=1&count=50", {
    method: "GET",
    headers: { "Content-Type": "application/json", "authorization": "Bearer "+req.session.auth.access_token },
  });

  const results = await response.json();

  res.render('members/index', { members: results });
});

/** Render UI for adding members  */
router.get('/create', authenticate, async (req, res, next) => {
    let data = {};
    if(req.query.errorMessage) {
        data.errorMsg = req.query.errorMessage;
    }
    res.render('members/create', data);
});

/** Render UI for adding members  */
router.post('/post', authenticate, async (req, res, next) => {

    const body = {
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        phone: req.body.phone
    };

    const response = await fetch("https://app.holaspirit.com/api/organizations/"+req.session.user.data.organizations[0]+"/members", {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": "Bearer "+req.session.auth.access_token },
        body: JSON.stringify(body)
    });

    const result = await response.json();

    if(result.data) {
        res.redirect('/members')
    } else {
        res.redirect('/members/create?errorMessage=Error Invalid Inputs');
    }

});

module.exports = router;
