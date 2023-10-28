const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET route for all session inputs

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "session_inputs";`;
  if (req.isAuthenticated()) {
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => console.log("Error retreiving all players"));
  } else {
    res.sendStatus(401);
  }
});

// GET route for sessions from specific player

router.get("/:id", (req, res) => {
  const queryText = `SELECT * FROM "session_inputs" WHERE "player_id" = $1;`;
  if (req.isAuthenticated()) {
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error retreiving player", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

// POST route for adding a new session

router.post("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.sendStatus(401);
  }

  const sessionInput = req.body;
  const playerId = req.params.id;

  const queries = sessionInput.map((input) => {
    const queryText = `INSERT INTO "session_inputs" ("buy_in", "cash_out", "buy_ins", "player_id", "week")
    VALUES ($1, $2, $3, $4, $5) RETURNING ID;`;
    return pool.query(queryText, [
      input.buyIn,
      input.cashOut,
      input.buyIns,
      playerId,
      input.week,
    ]);
  });

  const sessionQueries = sessionInput.map((input) => {
    const netProfit = input.cashOut - input.buyIn;
    const queryText = `INSERT INTO "sessions" ("net_profit", "week_number", "player_id")
    VALUES ($1, $2, $3);`;
    return pool.query(queryText, [netProfit, input.week, playerId]);
  });

  try {
    const response = await Promise.all(queries, sessionQueries);
    res.send(response);
  } catch (error) {
    console.log(`Error adding new session input`, error);
    res.sendStatus(500); // Server error
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
