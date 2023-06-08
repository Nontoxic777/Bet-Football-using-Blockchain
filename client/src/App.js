import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import TopSection from "./components/TopSection";
import Header from "./components/Header";
import MiddleSection from "./components/MiddleSection";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <TopSection />
      <MiddleSection />
    </ThemeProvider>
  );
}

export default App;
