import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const LinearGauge = ({
  homeValue,
  awayValue,
  homeColor = "green",
  awayColor = "orange",
}) => {
  // Calculate percentage for gauge bars
  const totalValue = homeValue + awayValue;
  const homePercentage =
    (homeValue / totalValue) * 100 || 0;
  const awayPercentage =
    (awayValue / totalValue) * 100 || 0;

  return (
    <div
      style={{
        width: "100%",
        height: "30px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          borderRadius: "15px 0 0 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: homeColor,
          width: `${homePercentage}%`,
          color: "white",
        }}
      >
        <HomeIcon style={{ marginRight: "8px" }} />
        {homePercentage.toFixed(0)}%
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          borderRadius: "0 15px 15px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: awayColor,
          width: `${awayPercentage}%`,
          color: "white",
        }}
      >
        {awayPercentage.toFixed(0)}%
        <FlightTakeoffIcon style={{ marginLeft: "8px" }} />
      </div>
    </div>
  );
};

export default LinearGauge;
