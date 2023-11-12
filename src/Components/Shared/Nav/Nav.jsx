import React from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <div className="nav-container">
        <div className="nav-body">
          <div className="nav-left">
            <img
              src="https://ik.imagekit.io/nlpt/Logos/nlpt-logo.png?updatedAt=1698203272490"
              alt="NLPT"
            />
            <h1>NLPT</h1>
          </div>
          <div className="nav-right">
            <ul className="nav-links">
              <li>
                <Link className="nav-link" to={"/"}>
                  HOME
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/stats"}>
                  STATS
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/members"}>
                  MEMBERS
                </Link>
              </li>
              <li>
                <Link className="nav-link" to={"/admin"}>
                  ADMIN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
