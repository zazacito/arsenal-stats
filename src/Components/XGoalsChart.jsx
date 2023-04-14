import React, { Fragment, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";
import {
  ReferenceDot,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const filterData = (data, filters) => {
  const { player, type, outcome, game } = filters;
  return data.filter((item) => {
    const playerMatch =
      player === "All" || item.player === player;
    const typeMatch = type === "All" || item.type === type;
    const outcomeMatch =
      outcome === "All" || item.outcome === outcome;
    const gameMatch = game === "All" || item.game === game;
    return (
      playerMatch && typeMatch && outcomeMatch && gameMatch
    );
  });
};

const XGoalsChart = ({ data, title, scale = 1 }) => {
  const [filters, setFilters] = useState({
    player: "All",
    type: "All",
    outcome: "All",
    game: "All",
  });

  const playerOptions = [
    ...new Set(data.map((item) => item.player)),
  ];
  const typeOptions = [
    ...new Set(data.map((item) => item.type)),
  ];
  const outcomeOptions = [
    ...new Set(data.map((item) => item.outcome)),
  ];
  const gameOptions = [
    ...new Set(data.map((item) => item.game)),
  ];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = filterData(data, filters);
  const CustomizedScatter = (props) => {
    const {
      cx,
      cy,
      scatterPointSize,
      fill,
      stroke,
      strokeWidth,
      className,
    } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={scatterPointSize}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={className}
      />
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const {
        xGoal,
        x,
        y,
        outcome,
        player,
        type,
        bodyPart,
      } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">{`x: ${x}, y: ${y}`}</p>
          <p className="tooltip-text">{`xGoal: ${xGoal}`}</p>
          <p className="tooltip-text">{`Outcome: ${outcome}`}</p>
          <p className="tooltip-text">{`Player: ${player}`}</p>
          <p className="tooltip-text">{`Type: ${type}`}</p>
          <p className="tooltip-text">{`Body Part: ${bodyPart}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <Select
            label="Player"
            name="player"
            value={filters.player}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="All">Select A Player</MenuItem>
            {playerOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sm={3}>
          <Select
            label="Type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="All">Select A Type</MenuItem>
            {typeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sm={3}>
          <Select
            label="Outcome"
            name="outcome"
            value={filters.outcome}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="All">
              Select The Outcome
            </MenuItem>
            {outcomeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item sm={3}>
          <Select
            label="Game"
            name="game"
            value={filters.game}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="All">
              Select The Fixture
            </MenuItem>
            {gameOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <div style={{ width: "100%", height: 700 }}>
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            {/* 
      The following Reference components are used to draw the football pitch
  */}
            <ReferenceDot
              x={12}
              y={40}
              r={10 * scale}
              stroke="black"
              fillOpacity={0}
            />{" "}
            {/* Left Penalty Arc */}
            <ReferenceDot
              x={60}
              y={40}
              r={10 * scale}
              stroke="black"
              fillOpacity={0}
            />{" "}
            {/* Center Circle */}
            <ReferenceDot
              x={108}
              y={40}
              r={10 * scale}
              stroke="black"
              fillOpacity={0}
            />{" "}
            {/* Right Penalty Arc */}
            <ReferenceArea
              x1={0}
              x2={18}
              y1={18}
              y2={80 - 18}
              fill="white"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Left Penalty Area */}
            <ReferenceArea
              x1={102}
              x2={120}
              y1={18}
              y2={80 - 18}
              fill="white"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Right Penalty Area */}
            <ReferenceArea
              x1={0}
              x2={6}
              y1={30}
              y2={80 - 30}
              fill="white"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Left 6-yard Box */}
            <ReferenceArea
              x1={114}
              x2={120}
              y1={30}
              y2={80 - 30}
              fill="white"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Right 6-yard box */}
            <ReferenceDot
              x={60}
              y={40}
              r={0.5 * scale}
              fill="black"
              stroke="black"
            />{" "}
            {/* Centre Spot */}
            <ReferenceDot
              x={12}
              y={40}
              r={0.5 * scale}
              fill="black"
              stroke="black"
            />{" "}
            {/* Left Penalty Spot */}
            <ReferenceDot
              x={108}
              y={40}
              r={0.5 * scale}
              fill="black"
              stroke="black"
            />{" "}
            <ReferenceLine x={60} stroke="black" />{" "}
            <ReferenceLine x={120} stroke="black" />{" "}
            <ReferenceLine y={0} stroke="black" />{" "}
            <ReferenceLine y={80} stroke="black" />{" "}
            {/* Center Half */}
            <ReferenceArea
              x1={0}
              x2={0.1}
              y1={36}
              y2={80 - 36}
              fill="black"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Left Goal line */}
            <ReferenceArea
              x1={119.9}
              x2={120}
              y1={36}
              y2={80 - 36}
              fill="black"
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Right Goal line */}
            <ReferenceArea
              x1={40}
              x2={120}
              y1={0}
              y2={0}
              fillOpacity={1}
              stroke="black"
            />{" "}
            {/* Pitch Outline */}
            <XAxis
              type="number"
              dataKey="x"
              hide
              domain={[60, 120]}
            />
            <YAxis
              type="number"
              dataKey="y"
              hide
              reversed
              domain={[0, 80]}
            />
            {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
            <Scatter
              name="Heatmap"
              data={filteredData}
              fill="#777777"
              shape={(props) => {
                const { xGoal } = props.payload;
                const scatterPointSize = xGoal * 25; // Adjust the multiplier to control the size of scatter points
                const fill =
                  props.payload.outcome === "Goal"
                    ? "green"
                    : "red";
                return (
                  <CustomizedScatter
                    cx={props.cx}
                    cy={props.cy}
                    scatterPointSize={scatterPointSize}
                    fill={fill}
                    stroke={props.stroke}
                    strokeWidth={props.strokeWidth}
                    className={props.className}
                  />
                );
              }}
              isAnimationActive={false}
            />
            <Tooltip content={<CustomTooltip />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
};

export default XGoalsChart;
