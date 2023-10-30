import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import players from "./players.reducer";

const rootReducer = combineReducers({
  errors,
  user,
  players,
});

export default rootReducer;
