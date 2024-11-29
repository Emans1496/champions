import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartGameScreen from "./pages/StartGameScreen";
import MainMenu from "./pages/MainMenu";
import Card from "./views/Card";
import { AudioProvider } from "../src/context/AudioContext";
import Credits from "./pages/Credits";
import SelectTeamMenu from "./pages/SelectTeamMenu";
import Match from "./pages/Match";
import MatchStats from "./pages/MatchStats";

function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <Routes>
          <Route path="/" element={<StartGameScreen />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/card" element={<Card />} />
          <Route path="/credits"element={<Credits />} />
          <Route path="/select-team-menu" element={<SelectTeamMenu />} />
          <Route path="/match" element={<Match />} />
          <Route path="/match-stats" element={<MatchStats />} />
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;
