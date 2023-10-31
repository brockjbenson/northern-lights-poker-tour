import React from "react";
import "./StatsNav.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function StatsNav() {
  return (
    <div className="stats-nav">
      <div className="stats-nav-btn">
        <Link to="">All Stats</Link>
      </div>
      <div className="stats-nav-btn"></div>
      <div className="stats-nav-btn"></div>
      <div className="stats-nav-btn"></div>
      <div className="stats-nav-btn"></div>
    </div>
  );
}
