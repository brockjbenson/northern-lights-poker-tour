import React, { useEffect } from "react";
import "./StatsDashboard.scss";
import Nav from "../../Shared/Nav/Nav";
import StatsNav from "../../Shared/StatsNav/StatsNav";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function StatsDashboard() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.allPlayerReducer);
  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS" });
  }, [dispatch]);

  console.log(players);
  return (
    <div className="stats-container">
      <Nav />
      <div className="stats-body">
        <h1>NLPT Stats Home</h1>
        <div className="stats-main">
          <StatsNav />
          <div className="stats-content"></div>
        </div>
      </div>
    </div>
  );
}
