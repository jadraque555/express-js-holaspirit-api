var express = require('express');
var router = express.Router();
var authenticate = require("../middleware/authentication");

/* GET users listing. */
router.get('/', authenticate, async (req, res, next) => {

  switch (req.query.apiType) {
    case "user":
        const response = await fetch("https://app.holaspirit.com/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json", "authorization": "Bearer "+req.session.auth.access_token },
        });
        const result = await response.json();
    
        res.json(result);
      break;
    case "members":
      
      break;
  
    default:
        res.json([]);
      break;
  }

});

module.exports = router;
