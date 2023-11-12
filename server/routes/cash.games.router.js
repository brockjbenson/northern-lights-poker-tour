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
    .catch((error) => console.log("Error retreiving all cash games", error));
});

router.get("/season/:id", (req, res) => {
  const seasonId = req.params.seasonId;
  const queryText = `SELECT *
      FROM cash_games AS cg
      JOIN players AS p ON cg.player_id = p.id;
      WHERE cg.season_id = $1;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) =>
      console.log(
        `Error retreiving all cash games from season: ${seasonId}`,
        error
      )
    );
});

module.exports = router;
