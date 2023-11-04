import React, { useEffect, useState } from "react";
import "./StatsDashboard.scss";
import Nav from "../../Shared/Nav/Nav";
import StatsNav from "../../Shared/StatsNav/StatsNav";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AllStatsComponents from "./StatsComponents/AllStatsComponents";

export default function StatsDashboard() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.allPlayerReducer);
  const allCashGames = useSelector((state) => state.cashGames.allCashGames);
  const [statsActive, setStatsActive] = useState(false);
  const [activeAllStats, setActiveAllStats] = useState(false);
  const [activeIndividualStats, setActiveIndividualStats] = useState(false);
  const [statsClass, setStatsClass] = useState("stats-nav-btn");
  const [showStandings, setShowStandings] = useState(false);
  const [standingsActive, setStandingsActive] = useState(false);
  const [standingsClass, setActiveStandingsClass] = useState("stats-nav-btn");
  console.log(allCashGames);
  let navProps = {
    statsActive: statsActive,
    setStatsActive: setStatsActive,
    activeAllStats: activeAllStats,
    setActiveAllStats: setActiveAllStats,
    activeIndividualStats: activeIndividualStats,
    setActiveIndividualStats: setActiveIndividualStats,
    statsClass: statsClass,
    setStatsClass: setStatsClass,
    standingsActive: standingsActive,
    setStandingsActive: setStandingsActive,
    standingsClass: standingsClass,
    setStandingsActiveClass: setActiveStandingsClass,
    showStandings: showStandings,
    setShowStandings: setShowStandings,
  };

  const dashboardProps = {
    players: players,
  };

  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS" });
    dispatch({ type: "FETCH_ALL_CASH_GAMES" });
  }, [dispatch]);

  return (
    <>
      <Nav />
      <div className="stats-container">
        <StatsNav navProps={navProps} />
        <div className="stats-body">
          <h1>NLPT Stats Home</h1>
          {activeAllStats && <AllStatsComponents />}
        </div>
      </div>
    </>
  );
}
