import React, {
  useState,
  useEffect,
  Fragment,
} from "react";
import { fetchCompetitionData } from "./../api/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../styles.css";
import XGoalsChart from "./XGoalsChart";
function XGoals() {
  const [competitionData, setCompetitionData] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCompetitionData();
        setCompetitionData(data);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  if (!competitionData) {
    return <div>Loading data...</div>;
  }

  const {
    country_name,
    competition_name,
    season_name,
    match_updated,
    match_available,
    matches,
    competition_info,
  } = competitionData;
  const {
    points,
    wins,
    draws,
    losses,
    goals,
    xgoals,
    xGoalsArray,
  } = competition_info;

  return (
    <Fragment>
      <Box
        className="box-bg"
        sx={{
          padding: "16px",
          borderRadius: "8px",
          margin: "16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          className="red-text"
          sx={{ marginBottom: "8px", textAlign: "center" }}
        >
          All About Expected Goals
        </Typography>
      </Box>

      <hr />
      <Box
        sx={{
          padding: "16px",
          borderRadius: "8px",
          margin: "16px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              className="red-text"
              sx={{
                marginBottom: "4px",
                textAlign: "center",
              }}
            >
              All Shots From The Season
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "4px",
                textAlign: "center",
              }}
            >
              You can use the select's to filters the shots
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <XGoalsChart data={xGoalsArray} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default XGoals;
