import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchAllPlayers() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/players", config);

    yield put({ type: "SET_PLAYERS", payload: response.data });
  } catch (error) {
    console.log("all stats get request failed", error);
  }
}

function* fetchSpecificPlayer(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(`/api/players/${action.payload}`, config);

    yield put({ type: "SET_PLAYER", payload: response.data });
  } catch (error) {
    console.log("player get request failed", error);
  }
}

function* allStatsSaga() {
  yield takeLatest("FETCH_PLAYERS", fetchAllPlayers);
  yield takeLatest("FETCH_PLAYER", fetchSpecificPlayer);
}

export default allStatsSaga;
