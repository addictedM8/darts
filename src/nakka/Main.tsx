import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  debounce,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import React, { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getTournamentData, processNakkaData } from "./api/nakka";
import { Group, Match, NakkaTournament } from "./api/nakka.t";
import { cachedData } from "./api/test-data";
import Player from "./Player";
import "./Main.css";
import { Round, tournaments } from "./api/tournaments";
import { AccountCircle } from "@mui/icons-material";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Stats from "./Stats";
import StatsTable from "./Stats";

const clubName = "MPB Darts";
const clubURL = "https://mpbdarts-club.sk/";

const getAllTournamentsData = async () => {
  const data: NakkaTournament[] = [];
  tournaments.forEach(async (t) => data.push(await getTournamentData(t.id)));
  return data;
};

const Main = () => {
  const seasonsCount = Array.from(
    new Set<number>(tournaments.map((t) => t.season))
  );
  const [season, setSeason] = useState<number | undefined>(seasonsCount[0]);

  const seasonRounds = tournaments
    .filter((t) => t.season === season)
    .map((r) => r.round);
  const [round, setRound] = useState<number | undefined>(seasonRounds[0]);
  const [view, setView] = useState<"stats" | "matches">("stats");

  useEffect(() => {
    setRound(seasonRounds[0]);
  }, [season]);

  const data = useMemo(() => processNakkaData(cachedData as any), []);
  console.log(data);

  return (
    <Container disableGutters>
      <Menu />
      <div className="responsiveContainer">
        <StatsTable rows={data.stats} />
        {/* {data.matches.map((match) => match && <MatchCard {...match!} />)} */}
      </div>
    </Container>
  );

  function MatchCard(match: Match): JSX.Element {
    return (
      <Card
        key={`${match?.player1.id}${match?.player2.id}`}
        sx={{
          minWidth: 275,
          maxWidth: 700,
          margin: 1,
          flexGrow: 1,
          flexBasis: "auto",
        }}
        variant="outlined"
        raised={true}
      >
        <CardContent
          sx={{ display: "flex", width: "auto", alignContent: "center" }}
        >
          <div className="matchPlayer1">
            <span
              style={{
                color:
                  match!.player1.score! > match!.player2.score
                    ? "gold"
                    : "white",
              }}
            >
              {match?.player1.name}
            </span>
            <span>{match?.player1.score}</span>
            <span>{match?.player1.avg}</span>
          </div>
          <div className="matchDescription">
            <span>vs</span>
            <span>skore</span>
            <span>priemer</span>
          </div>
          <div className="matchPlayer2">
            <span
              style={{
                color:
                  match!.player2.score! > match!.player1.score
                    ? "gold"
                    : "white",
              }}
            >
              {match?.player2.name}
            </span>
            <span>{match?.player2.score}</span>
            <span>{match?.player2.avg}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  function Menu() {
    const [player, setPlayer] = useState<string>();
    return (
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="regular">
            <img
              src={require("./img/mpb2d.png")}
              alt="mpb logo"
              width="80px"
              height="80px"
            />
            <Box
              sx={{ minWidth: "60px", marginLeft: "15px", paddingtop: "10px" }}
            >
              <FormControl fullWidth>
                <InputLabel id="season-label">Sezona</InputLabel>
                <Select
                  labelId="season"
                  id="season"
                  value={season}
                  label="Sezona"
                  onChange={(event) => {
                    setSeason(Number(event.target.value));
                  }}
                >
                  {seasonsCount.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginLeft: "15px", paddingtop: "10px" }}>
              <FormControl fullWidth>
                <InputLabel id="round-label">Kolo</InputLabel>
                <Select
                  labelId="round"
                  id="round"
                  value={round}
                  label="Kolo"
                  onChange={(event) => setRound(Number(event.target.value))}
                >
                  {seasonRounds.map((round) => (
                    <MenuItem key={round} value={round}>
                      {round}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginLeft: "15px", paddingtop: "10px" }}>
              <FormControl fullWidth>
                <ToggleButtonGroup
                  color="primary"
                  value={view}
                  exclusive
                  unselectable="off"
                  onChange={(event, value) => setView(value)}
                  aria-label="Platform"
                >
                  <ToggleButton value="stats">
                    <QueryStatsIcon />
                  </ToggleButton>
                  <ToggleButton value="matches">
                    <ScoreboardIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginLeft: "20px",
              }}
            >
              <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={Object.values(data.players)}
                autoHighlight
                value={player}
                onChange={(event, value) => setPlayer(value ?? "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Hrac"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
};

export default Main;
