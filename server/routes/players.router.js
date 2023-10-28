const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET route for all players

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "players" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log("Error retreiving all players"));
});

// GET route for a single player

router.get("/:id", (req, res) => {
  const queryText = `SELECT * FROM "players" WHERE "id" = $1;`;
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

// POST route for adding a new player

router.post("/", (req, res) => {
  const player = req.body;
  console.log(player);
  console.log();
  const queryText = `INSERT INTO "players" ("first_name", "last_name")
    VALUES ($1, $2);`;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [player.firstName, player.lastName])
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`Error adding new player`, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

// PUT route for updating a player

router.put("/:id", (req, res) => {
  const player = req.body;
  const queryText = `UPDATE "players" SET "first_name" = $1, "last_name" = $2 WHERE "id" = $3;`;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [player.firstName, player.lastName, req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(`Error updating player`, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

// DELETE route for deleting a player

router.delete("/:id", (req, res) => {
  const queryText = `DELETE FROM "players" WHERE "id" = $1;`;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log(`Error deleting player`, error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
