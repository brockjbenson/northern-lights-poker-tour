import React, { useEffect } from "react";
import "./Home.scss";
import Nav from "../../Shared/Nav/Nav";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.players.allPlayerReducer);
  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS" });
  }, [dispatch]);

  console.log(players);
  return (
    <div className="home-container">
      <section className="landing">
        <Nav />
        <h1>Hello</h1>
      </section>
    </div>
  );
}
