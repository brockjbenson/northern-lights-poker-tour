import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./Components/Styles/App.scss";
import Home from "./Components/Pages/Home/Home.jsx";
import StatsDashboard from "./Components/Pages/Stats/StatsDashboard";

function App() {
  return (
    <Router>
      <div className="body">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/stats">
            <StatsDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
