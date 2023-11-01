import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import "./StatsNav.scss";

export default function StatsNav({ navProps }) {
  function handleStatsClick() {
    const newActiveState = !navProps.statsActive;
    navProps.setStatsActive(newActiveState);
    if (newActiveState) {
      navProps.setStatsClass(`${navProps.statsClass} stats-active-btn`);
    } else {
      navProps.setStatsClass("stats-nav-btn");
      navProps.setActiveIndividualStats(false);
    }
  }
  function handleIndClick() {
    const newIndStatsState = !navProps.activeIndividualStats;

    navProps.setActiveIndividualStats(newIndStatsState);
    if (!navProps.statsActive) {
      navProps.setStatsClass(`${navProps.statsClass} stats-active-btn`);
    }
  }
  return (
    <div className="stats-nav">
      <p className="stats-menu-text">Menu</p>
      <div className={navProps.statsClass}>
        <div onClick={handleStatsClick} className="stats-btn-text">
          <div className="icon-text">
            <ImStatsBars className="stats-icon" />
            <p>STATS</p>
          </div>
          {navProps.statsActive ? (
            <HiChevronUp className="stats-chevron" />
          ) : (
            <HiChevronDown className="stats-chevron" />
          )}
        </div>

        {navProps.statsActive && (
          <ul className="stats-drop-down">
            <li
              onClick={() => navProps.setActiveAllStats(true)}
              className="stats-nav-item"
            >
              All Stats
            </li>
            <li onClick={handleIndClick} className="stats-nav-item">
              Individual
              <span className="ind-stats-span">
                {navProps.activeIndividualStats ? (
                  <HiChevronUp className="ind-stats-chevron" />
                ) : (
                  <HiChevronDown className="ind-stats-chevron" />
                )}
              </span>
            </li>
            {navProps.activeIndividualStats && (
              <ul className="ind-stats-dropdown">
                <li className="stats-nav-item">Career</li>
                <li className="stats-nav-item">Season</li>
              </ul>
            )}
            <li className="stats-nav-item">Majors</li>
          </ul>
        )}
      </div>
    </div>
  );
}
