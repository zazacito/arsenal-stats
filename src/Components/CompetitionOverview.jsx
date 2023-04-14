import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";
import LinearGauge from "./LinearGauge";
import XGoalsChart from "./XGoalsChart";
const CompetitionOverview = ({
  competitionData,
  matches,
}) => {
  // Destructure the competition info object
  const {
    points,
    wins,
    draws,
    losses,
    goals,
    xgoals,
    xGoalsArray,
  } = competitionData;

  // Function to determine result chip color based on match result
  const getResultChipColor = (result) => {
    switch (result) {
      case "win":
        return "success";
      case "loss":
        return "error";
      case "draw":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            className="red-text"
          >
            Season Overview
          </Typography>
        </Grid>
        {/* Total Points Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Total Points
              </Typography>
              <Typography variant="h4" align="center">
                {points.total}
              </Typography>
              <br />

              <LinearGauge
                homeValue={points.home}
                awayValue={points.away}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Wins Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Wins
              </Typography>
              <Typography variant="h4" align="center">
                {wins.total}
              </Typography>
              <br />
              <LinearGauge
                homeValue={wins.home}
                awayValue={wins.away}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Draws Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Draws
              </Typography>
              <Typography variant="h4" align="center">
                {draws.total}
              </Typography>
              <br />
              <LinearGauge
                homeValue={draws.home}
                awayValue={draws.away}
              />
            </CardContent>
          </Card>
        </Grid>
        <br />
        <hr />
        <br />
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            className="red-text"
          >
            Goals & Expected Goals
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  Here is a map of all Shots during the
                  season. Hover over a dot to get all the
                  information about it. Each dot represents
                  a shot. The bigger a dot is, the bigger is
                  XGoal value is.
                </Typography>
                <hr />
                <Typography variant="body1" align="center">
                  If you want more insights about the
                  XGoals, by player, by match or some cool
                  visualisation.
                  <br />
                  <Button
                    variant="outlined"
                    color="primary"
                    className="red-bg"
                  >
                    Click Here
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  Goals Scored
                </Typography>
                <Typography variant="h4" align="center">
                  {goals.total}
                </Typography>
                <br />
                <LinearGauge
                  homeValue={goals.home}
                  awayValue={goals.away}
                />
              </CardContent>
            </Card>
          </Grid>
          <br />
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                >
                  XGoals For
                </Typography>
                <Typography variant="h4" align="center">
                  {xgoals.total.toFixed(1)}
                </Typography>
                <br />
                <LinearGauge
                  homeValue={xgoals.home}
                  awayValue={xgoals.away}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <XGoalsChart data={xGoalsArray} />
        </Grid>

        {/* Losses Card */}
        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                align="center"
              >
                Losses
              </Typography>
              <Typography variant="h4" align="center">
                {losses.total}
              </Typography>
              <br />
              <LinearGauge
                homeValue={losses.home}
                awayValue={losses.away}
              />
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
      <hr />
      <Grid item xs={12}>
        <Typography
          variant="h6"
          gutterBottom
          className="red-text"
        >
          All Fixtures
        </Typography>
      </Grid>

      {/* Matches Table */}
      <TableContainer>
        <Table>
          <TableHead className="red-bg">
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                #
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Home Team
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Away Team
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Score
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Expected Score
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Result
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white" }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow
                key={match.match_id}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? "#f8f9fa" : "inherit",
                }}
                align="center"
              >
                <TableCell align="center">
                  {index + 1}
                </TableCell>
                <TableCell align="center">
                  {match.home_team.home_team_name ===
                  "Arsenal" ? (
                    <Chip
                      label={match.home_team.home_team_name}
                      color="error"
                    />
                  ) : (
                    <span>
                      {match.home_team.home_team_name}
                    </span>
                  )}
                </TableCell>
                <TableCell align="center">
                  {match.away_team.away_team_name ===
                  "Arsenal" ? (
                    <Chip
                      label={match.away_team.away_team_name}
                      color="error"
                    />
                  ) : (
                    <span>
                      {match.away_team.away_team_name}
                    </span>
                  )}
                </TableCell>

                <TableCell align="center">{`${match.home_score} - ${match.away_score}`}</TableCell>
                <TableCell align="center">{`${match.xGoalsHome.toFixed(
                  1
                )} - ${match.xGoalsAway.toFixed(
                  1
                )}`}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={match.result}
                    color={getResultChipColor(match.result)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="red-bg"
                    onClick={() =>
                      handleMatchDetails(match)
                    }
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompetitionOverview;
