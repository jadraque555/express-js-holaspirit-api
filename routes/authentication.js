var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();

/* POST holaspirit verification. */
router.post('/', async (req, res, next) => {
    
    const body = {
        client_id: "54cb79d0279871e1248b4567_400tdzqbdcowsskk08gws0wkwogck00w084w4s8w8gok08s0o8",
        grant_type: "password",
        username: req.body.email,
        password: req.body.password
    };

    const response = await fetch("https://app.holaspirit.com/oauth/v2/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const result = await response.json();

    if(result.error) {
        return res.json(result);
    }
    /** VERIFICATION SUCCESS */
    req.session.isLoggedIn = true;
    req.session.auth = result;

    return res.json(result);
});

module.exports = router;
