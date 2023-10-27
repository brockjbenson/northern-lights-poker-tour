import React from "react";
import "./Home.scss";
import Nav from "../Shared/Nav/Nav";
export default function Home() {
  return (
    <div className="home-container">
      <section className="landing">
        <Nav />
        <h1>Hello</h1>
      </section>
    </div>
  );
}
