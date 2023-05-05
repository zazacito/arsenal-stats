import ReactDOM from "react-dom";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./styles.css";

import Summary from "./Components/Summary";
import XGoals from "./Components/XGoals";
import TopScorers from "./Components/TopScorers";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [view, setView] = useState("summary");

  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
  };
  // const data = [
  //   { name: "Thierry Henry", goals: 30 },
  //   { name: "Robert Pires", goals: 14 },
  //   { name: "Freddie Ljungberg", goals: 10 },
  //   { name: "Dennis Bergkamp", goals: 7 },
  //   { name: "Sol Campbell", goals: 3 },
  // ];
  // const xGoalsData = [
  //   {
  //     x: 20,
  //     y: 50,
  //     xGoal: 0.7,
  //     outcome: "Goal",
  //     type: "header",
  //   },
  //   {
  //     x: 80,
  //     y: 20,
  //     xGoal: 0.9,
  //     outcome: "Goal",
  //     type: "penalty",
  //   },
  //   {
  //     x: 40,
  //     y: 60,
  //     xGoal: 0.4,
  //     outcome: "Missed",
  //     type: "shoot",
  //   },
  //   {
  //     x: 60,
  //     y: 30,
  //     xGoal: 0.2,
  //     outcome: "Saved",
  //     type: "penalty",
  //   },
  // ];

  const views = [
    { label: "Summary", value: "summary" },
    { label: "xGoals", value: "xgoals" },
    { label: "Top Scorer", value: "topscorer" },
    { label: "Details Per Player", value: "playerdetails" },
    { label: "Details Per Game", value: "gamedetails" },
  ];

  const handleViewChange = (value) => {
    setView(value);
  };

  return (
    <div
      className={`App ${
        darkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <AppBar position="static" className="custom-app-bar">
        <Toolbar>
          <Typography variant="h6">
            Arsenal Invincibles Season - Insights
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            {views.map((viewButton) => (
              <Button
                key={viewButton.value}
                color="inherit"
                className={
                  view === viewButton.value
                    ? "selected"
                    : ""
                }
                sx={{ color: "#b0b0b0f2" }}
                onClick={() =>
                  handleViewChange(viewButton.value)
                }
              >
                {viewButton.label}
              </Button>
            ))}
            <IconButton
              onClick={handleThemeToggle}
              color="inherit"
            >
              {darkTheme ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* content goes here */}
      <body>
        {view == "summary" && <Summary />}
        {view == "xgoals" && <XGoals />}
        {view == "topscorer" && <TopScorers />}
      </body>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
