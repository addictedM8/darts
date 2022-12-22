/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Main from "./nakka/Main";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <Main />
      </Box>
    </ThemeProvider>
  );
}

export default App;
