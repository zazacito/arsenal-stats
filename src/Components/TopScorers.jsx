import React, {
  useState,
  useEffect,
  Fragment,
} from "react";
import { fetchCompetitionData } from "../api/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "../styles.css";
import BarChart from "./BarChart";
function TopScorers() {
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
    topScorers,
  } = competition_info;

  console.log(topScorers);
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
          All About The Scorers
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
            <BarChart title="" data={topScorers} />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default TopScorers;
