const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { ca } = require("date-fns/locale");

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

router.get("/sessions/:id", (req, res) => {
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

// POST route for adding a new session

router.post("/:id", async (req, res) => {
  try {
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

    await Promise.all([queries]);
    await axios.post(
      `http://localhost:5000/api/sessions/inputs/session/${playerId}`,
      sessionInput
    );
    // console.log("Axios Response:", axiosResponse.status, axiosResponse.data);

    await cashGamesUpdate(playerId);
    res.sendStatus(201);
  } catch (error) {
    console.log(`Error adding new session input`, error);
    res.sendStatus(500); // Server error
  }
});

async function cashGamesUpdate(id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/sessions/inputs/sessions/${id}`
    );
    const sessions = response.data;
    await cashGameMath(sessions, id);
  } catch (error) {
    console.log("Error updating cash games", error);
  }
}

async function cashGameMath(arr, id) {
  console.log("cashGameMath", arr);

  // Net Profit Calculation

  const netProfit = arr.reduce((accum, current) => {
    return accum + parseFloat(current.net_profit);
  }, 0);

  // Gross Profit Calculation

  const grossProfit = arr
    .filter((item) => parseFloat(item.net_profit) > 0)
    .reduce((accum, current) => {
      return accum + parseFloat(current.net_profit);
    }, 0);

  // Gross Loss Calculation

  const grossLoss = arr
    .filter((item) => parseFloat(item.net_profit) < 0)
    .reduce((accum, current) => {
      return accum + parseFloat(current.net_profit);
    }, 0);

  // Wins Calculation

  const wins = arr.filter((item) => parseFloat(item.net_profit) > 0).length;

  // Losses Calculation
  const losses = arr.filter((item) => parseFloat(item.net_profit) < 0).length;

  // Sessions Played Calculation
  const sessionsPLayed = arr.length;

  // Average Win Calculation

  const positiveProfits = arr.filter((item) => parseFloat(item.net_profit) > 0);

  const totalPositiveNetProfit = positiveProfits.reduce((accum, current) => {
    return accum + parseFloat(current.net_profit);
  }, 0);

  let averageWin;

  if (positiveProfits.length > 0) {
    averageWin = totalPositiveNetProfit / positiveProfits.length.toFixed(2);
  } else {
    averageWin = 0.0;
  }

  // Average Loss Calculation

  const negativeProfits = arr.filter((item) => parseFloat(item.net_profit) < 0);

  const totalNegativeNetProfit = negativeProfits.reduce((accum, current) => {
    return accum + parseFloat(current.net_profit);
  }, 0);

  let averageLoss;

  if (negativeProfits.length > 0) {
    averageLoss = totalNegativeNetProfit / negativeProfits.length;
  } else {
    averageLoss = 0.0;
  }

  // Buy Ins Per Session Calculation

  const buyInsCount = arr.reduce((accum, current) => {
    return accum + parseFloat(current.buy_ins);
  }, 0);

  let buyInsPerSession;

  if (buyInsCount > 0) {
    buyInsPerSession = buyInsCount / sessionsPLayed;
  } else {
    buyInsPerSession = 0.0;
  }

  // Average Net Profit Calculation

  const averageNetProfit = (netProfit / arr.length).toFixed(2);

  // Win Percentage Calculation

  const winPercentage = Number(((wins / sessionsPLayed) * 100).toFixed(2));

  const cashGameObject = {
    netProfit: Number(netProfit.toFixed(2)),
    grossProfit: Number(grossProfit.toFixed(2)),
    grossLoss: Number(grossLoss.toFixed(2)),
    wins: wins,
    losses: losses,
    sessionsPLayed: sessionsPLayed,
    averageWin: Number(averageWin.toFixed(2)),
    averageLoss: Number(averageLoss.toFixed(2)),
    buyInsPerSession: buyInsPerSession,
    averageNetProfit: Number(averageNetProfit),
    winPercentage: winPercentage,
  };

  await axios.put(
    `http://localhost:5000/api/sessions/inputs/cash-games/${id}`,
    cashGameObject
  );
}

router.put("/cash-games/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const cashGameObject = req.body;
  try {
    const queryText = `
    UPDATE "cash_games" 
    SET "net_profit" = $1, "gross_winnings" = $2, "gross_losses" = $3, "avg_win" = $4, 
    "avg_loss" = $5, "avg_net_profit" = $6, "wins" = $7, "losses" = $8, "sessions_played" = $9,
    "average_buy_in" = $10, "win_percentage" = $11
    WHERE "player_id" = $12;`;
    pool
      .query(queryText, [
        cashGameObject.netProfit,
        cashGameObject.grossProfit,
        cashGameObject.grossLoss,
        cashGameObject.averageWin,
        cashGameObject.averageLoss,
        cashGameObject.averageNetProfit,
        cashGameObject.wins,
        cashGameObject.losses,
        cashGameObject.sessionsPLayed,
        cashGameObject.buyInsPerSession,
        cashGameObject.winPercentage,
        id,
      ])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error updating cash game request", error);
      });
  } catch (error) {
    console.log("Error updating cash games", error);
  }
});

router.put("/cash-games-reset/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const queryText = `UPDATE "cash_games" 
    SET "net_profit" = $1, "gross_winnings" = $2, "gross_losses" = $3, "avg_win" = $4, 
    "avg_loss" = $5, "avg_net_profit" = $6, "wins" = $7, "losses" = $8, "sessions_played" = $9,
    "average_buy_in" = $10, "win_percentage" = $11
    WHERE "player_id" = $12;`;
    pool
      .query(queryText, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error updating cash game request", error);
      });
  } catch (error) {
    console.log("Error resetting cash games", error);
  }
});

router.post("/session/:id", async (req, res) => {
  try {
    const sessionInput = req.body;
    const playerId = req.params.id;

    const queries = sessionInput.map((input) => {
      const queryText = `INSERT INTO "sessions" ("net_profit", "week_number", "player_id", "buy_ins")
    VALUES ($1, $2, $3, $4) RETURNING ID;`;
      return pool.query(queryText, [
        input.cashOut - input.buyIn,
        input.week,
        playerId,
        input.buyIns,
      ]);
    });

    await Promise.all(queries);
    res.sendStatus(201);
  } catch (error) {
    console.log(`Error adding new session input`, error);
    res.sendStatus(500); // Server error
  }
});

// async function sessionMath(id) {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/sessions/inputs/session/${Number(id)}`
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.log(`Error adding new session math`, error);
//     res.sendStatus(500); // Server error
//   }
// }

// PUT route for updating a player

// router.get("/session/:id", async (req, res) => {
//   const queryText = `SELECT * FROM "sessions" WHERE "player_id" = $1;`;
//   if (req.isAuthenticated()) {
//     pool
//       .query(queryText, [req.params.id])
//       .then((result) => {
//         res.send(result.rows);
//       })
//       .catch((error) => {
//         console.log("Error retreiving player", error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(401);
//   }
// });

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
