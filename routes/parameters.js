var express = require('express');
var router = express.Router();

/* GET parameters listing. */
router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let sqlQuery = "SELECT * FROM parameters";
  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;

    console.log("results")
    console.log(results)
    res.json(results);

  });
});

module.exports = router;
