// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AudioProvider } from "./context/AudioContext"; // Importa AudioProvider
import PrivateRoute from "./components/PrivateRoute";
import { CSSTransition } from "react-transition-group";
import "./app.css";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainMenu from "./pages/MainMenu";
import StartGameScreen from "./pages/StartGameScreen";
import SelectTeamMenu from "./pages/SelectTeamMenu";
import Match from "./pages/Match";
import MatchStats from "./pages/MatchStats";
import Credits from "./pages/Credits";

function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <StartGameScreen />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/main-menu"
              element={
                <PrivateRoute>
                  <MainMenu />
                </PrivateRoute>
              }
            />
            <Route
              path="/select-team"
              element={
                <PrivateRoute>
                  <SelectTeamMenu />
                </PrivateRoute>
              }
            />
            <Route
              path="/match"
              element={
                <PrivateRoute>
                  <Match />
                </PrivateRoute>
              }
            />
            <Route
              path="/match-stats"
              element={
                <PrivateRoute>
                  <MatchStats />
                </PrivateRoute>
              }
            />
            <Route
              path="/credits"
              element={
                <PrivateRoute>
                  <Credits />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
}

export default App;
