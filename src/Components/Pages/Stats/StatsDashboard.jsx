import React, { useEffect } from "react";
import "./StatsDashboard.scss";
import Nav from "../../Shared/Nav/Nav";
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
      <section className="landing">
        <Nav />
      </section>
    </div>
  );
}
