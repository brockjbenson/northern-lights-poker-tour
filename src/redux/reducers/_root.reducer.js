import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import players from "./players.reducer";
import cashGames from "./cash.games.reducer";

const rootReducer = combineReducers({
  errors,
  user,
  players,
  cashGames,
});

export default rootReducer;
