import { combineReducers } from "redux";

const allPlayerReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PLAYERS":
      return action.payload;
    default:
      return state;
  }
};

const specificPlayerReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
export default combineReducers({
  allPlayerReducer,
  specificPlayerReducer,
});
