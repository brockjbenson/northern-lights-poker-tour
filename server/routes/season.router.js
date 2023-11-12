const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "season_year";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log("Error retrieving seasons", error));
});

router.post("/", (req, res) => {
  const queryText = `INSERT INTO "season_year" ("season") VALUES ($1);`;
  pool
    .query(queryText, [req.body.season])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new season`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
