import { combineReducers } from "redux";

const allCashGames = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_CASH_GAMES":
      return action.payload;
    default:
      return state;
  }
};

// const specificPlayerReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "SET_PLAYER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// user will be on the redux state at:
export default combineReducers({
  allCashGames,
});
