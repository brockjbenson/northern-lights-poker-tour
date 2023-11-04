const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/all", (req, res) => {
  const queryText = `SELECT *
    FROM cash_games AS cg
    JOIN players AS p ON cg.player_id = p.id;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log("Error retreiving all players"));
});

module.exports = router;
