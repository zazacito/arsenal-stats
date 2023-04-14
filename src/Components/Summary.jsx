// Summary.jsx

import React, {
  useState,
  useEffect,
  Fragment,
} from "react";
import { fetchCompetitionData } from "./../api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../styles.css";
import CompetitionOverview from "./CompetitionOverview";
function Summary() {
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
          sx={{ marginBottom: "16px", textAlign: "center" }}
        >
          The Invincibles Project - Data Visualisation
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginBottom: "16px" }}
        >
          The idea behind this app is to use all the awesome
          data collected by statsbomb of this historic
          season to be able to look at it through a modern
          lens. All the data is courtesy of statsbomb and
          can be found{" "}
          <a href="https://github.com/statsbomb/open-data/tree/master/data">
            {" "}
            here
          </a>
          .
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginBottom: "8px" }}
        >
          All the data presented in this app comes from the
          statsbomb github repository. It's from the
          2003/2004 premier league seasons where Arsenal
          finished undefeated.
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
        <CompetitionOverview
          competitionData={competition_info}
          matches={matches}
        />
      </Box>
    </Fragment>
  );
}

export default Summary;
