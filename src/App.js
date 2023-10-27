import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Components/Styles/App.scss";
import Home from "./Components/Pages/Home.jsx";

function App() {
  return (
    <Router>
      <div className="body">
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
