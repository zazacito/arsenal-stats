import axios from 'axios';

export const fetchCompetitionData = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/statsbomb/open-data/master/data/competitions.json');
    const competitions = response.data;

    // Filter the competition with the desired competition_id and season_id
    const desiredCompetition = competitions.find(comp => comp.competition_id === 2 && comp.season_id === 44);

    // Fetch all the matches for the competition
    const matchesResponse = await axios.get(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/${desiredCompetition.competition_id}/${desiredCompetition.season_id}.json`);
    const matches = matchesResponse.data;

    // Fetch event data for each match
    const matchPromises = matches.map(async match => {
      const matchId = match.match_id;
      const eventResponse = await axios.get(`https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/${matchId}.json`);
      match.events = eventResponse.data;
      return match;
    });

    // Wait for all match promises to resolve
    const matchesWithData = await Promise.all(matchPromises);

    const orderedMatches = matchesWithData.sort((a, b) => {
      const dateA = new Date(a.match_date);
      const dateB = new Date(b.match_date);
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    // Add matches data with event data to the competition data
    desiredCompetition.matches = orderedMatches;
    // Return the filtered competition data with matches and event data

    const data = computeInformationAboutSeason(desiredCompetition, 1)

    return data;
  } catch (error) {
    console.error('Failed to fetch competition data:', error);
    throw error;
  }
};

const computeInformationAboutSeason = (desiredCompetition, teamId = 1) => {
  const competition_info = {
    points: {
      total: 0,
      home: 0,
      away: 0
    },
    wins: {
      total: 0,
      home: 0,
      away: 0
    },
    draws: {
      total: 0,
      home: 0,
      away: 0
    },
    losses: {
      total: 0,
      home: 0,
      away: 0
    },
    goals: {
      total: 0,
      home: 0,
      away: 0,
      for: 0,
      against: 0
    },
    xgoals: {
      total: 0,
      for: 0,
      against: 0,
      home: 0,
      away: 0,
    },
    xGoalsArray: []
  };

  desiredCompetition.matches.forEach((match, index) => {
    const { home_score, away_score, home_team, away_team } = match;
    const venue = home_team.home_team_id === teamId ? "home" : "away";

    switch (true) {
      case home_score > away_score && venue === "home":
        // it's a win at home
        match.result = "win";
        competition_info.points[venue] += 3;
        competition_info.points.total += 3;
        competition_info.wins[venue]++;
        competition_info.wins.total++;
        break;
      case home_score < away_score && venue === "away":
        // it's a win away
        match.result = "win";
        competition_info.points[venue] += 3;
        competition_info.points.total += 3;
        competition_info.wins[venue]++;
        competition_info.wins.total++;
        break;
      case home_score === away_score:
        // it's a draw
        match.result = "draw";
        competition_info.points[venue]++;
        competition_info.points.total++;
        competition_info.draws[venue]++;
        competition_info.draws.total++;
        break;
      default:
        // it's a loss
        match.result = "loss";
        competition_info.losses[venue]++;
        competition_info.losses.total++;
        break;
    }

    // Calculate xGoals
    let shotsFor = match.events.filter((element) => element.type.name === "Shot" && element.team.id === teamId);
    let shotsAgainst = match.events.filter((element) => element.type.name === "Shot" && element.team.id !== teamId);

    let totalXGoalsFor = shotsFor.reduce((acc, shot) => acc + shot.shot.statsbomb_xg, 0);
    let totalXGoalsAgainst = shotsAgainst.reduce((acc, shot) => acc + shot.shot.statsbomb_xg, 0);

    match.xGoalsFor = totalXGoalsFor;
    match.xGoalsAgainst = totalXGoalsAgainst;

    competition_info.goals.for += match.xGoalsFor
    competition_info.goals.against += match.xGoalsAgainst

    competition_info.xgoals[venue] += totalXGoalsFor;
    competition_info.xgoals.total += totalXGoalsFor;

    if (venue === "home") {
      match.xGoalsHome = totalXGoalsFor;
      match.xGoalsAway = totalXGoalsAgainst;
    } else {
      match.xGoalsHome = totalXGoalsAgainst;
      match.xGoalsAway = totalXGoalsFor;
    }

    let xGoalsData = [];
    // Calculate Goals For and Against
    shotsFor.forEach((shot) => {
      if (shot.shot.outcome.name === "Goal") {
        competition_info.goals.for++;
        competition_info.goals[venue]++;
        competition_info.goals.total++;
      }

      let newShot = {
        x: shot.location[0],
        y: shot.location[1],
        player: shot.player.name,
        playerId: shot.player.id,
        xGoal: shot.shot.statsbomb_xg,
        type: shot.shot.type.name,
        outcome: shot.shot.outcome.name,
        bodyPart: shot.shot.body_part.name,
        game: "J" + (index + 1) + " " + home_team.home_team_name + " vs " + away_team.away_team_name
      }
      competition_info.xGoalsArray.push(newShot)
      xGoalsData.push(newShot)
    });

    match.xGoalsData = xGoalsData;
    shotsAgainst.forEach((shot) => {
      if (shot.shot.outcome.name === "Goal") {
        competition_info.goals.against++;
      }
    });

  });

  desiredCompetition["competition_info"] = competition_info;
  return desiredCompetition;
};

