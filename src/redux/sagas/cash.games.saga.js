import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAllCashGames() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/cash-games/all", config);

    yield put({ type: "SET_ALL_CASH_GAMES", payload: response.data });
  } catch (error) {
    console.log("all stats get request failed", error);
  }
}

// function* fetchSpecificPlayer(action) {
//   try {
//     const config = {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     };
//     const response = yield axios.get(`/api/players/${action.payload}`, config);

//     yield put({ type: "SET_PLAYER", payload: response.data });
//   } catch (error) {
//     console.log("player get request failed", error);
//   }
// }

function* cashGamesSaga() {
  yield takeLatest("FETCH_ALL_CASH_GAMES", fetchAllCashGames);
  // yield takeLatest("FETCH_PLAYER", fetchSpecificPlayer);
}

export default cashGamesSaga;
