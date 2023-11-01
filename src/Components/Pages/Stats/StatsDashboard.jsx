import React, { useEffect, useState } from "react";
import "./StatsDashboard.scss";
import Nav from "../../Shared/Nav/Nav";
import StatsNav from "../../Shared/StatsNav/StatsNav";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function StatsDashboard() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.allPlayerReducer);
  const [statsActive, setStatsActive] = useState(false);
  const [activeAllStats, setActiveAllStats] = useState(false);
  const [activeIndividualStats, setActiveIndividualStats] = useState(false);
  const [statsClass, setStatsClass] = useState("stats-nav-btn");

  let navProps = {
    statsActive: statsActive,
    setStatsActive: setStatsActive,
    activeAllStats: activeAllStats,
    setActiveAllStats: setActiveAllStats,
    activeIndividualStats: activeIndividualStats,
    setActiveIndividualStats: setActiveIndividualStats,
    statsClass: statsClass,
    setStatsClass: setStatsClass,
  };

  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS" });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div className="stats-container">
        <StatsNav navProps={navProps} />
        <div className="stats-body">
          <h1>NLPT Stats Home</h1>
        </div>
      </div>
    </>
  );
}
