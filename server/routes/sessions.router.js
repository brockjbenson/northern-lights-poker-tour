const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", (req, res) => {
  const queryText = `SELECT * FROM "sessions" WHERE "player_id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retreiving player", error);
      res.sendStatus(500);
    });
});

router.get("/season/:id", (req, res) => {
  const seasonId = req.body.seasonId;
  const queryText = `SELECT * FROM "sessions" WHERE "player_id" = $1 AND "season_id" = $2;`;
  pool
    .query(queryText, [req.params.id, seasonId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retreiving player", error);
      res.sendStatus(500);
    });
});

module.exports = router;
