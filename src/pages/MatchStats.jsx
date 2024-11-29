import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/style/MatchStats.scss";
import { CSSTransition } from "react-transition-group";

export default function MatchStats() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    score,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    homeActions,
    awayActions,
  } = location.state || {};

  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="match-stats-page">
          <div className="topStats-page">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/512px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png"
              alt="LaLiga"
            />
            <h1>MATCH RESULT</h1>
            <div className="teams-page">
              <div className="team-page">
                <img src={homeTeamLogo} alt={homeTeam} />
                <h2>{homeTeam}</h2>
                <h3>{score.home}</h3>
              </div>
              <div className="team-page">
                <img src={awayTeamLogo} alt={awayTeam} />
                <h2>{awayTeam}</h2>
                <h3>{score.away}</h3>
              </div>
            </div>
          </div>

          <div className="actions-page">
            <div className="playerActions-page">
              <h3>Your action:</h3>
              <ul>
                {homeActions.map((action, index) => (
                  <li key={index}>
                    {action.player} try to {action.actionType}:{" "}
                    {action.success ? "Successo" : "Fallito"}
                  </li>
                ))}
              </ul>
            </div>
            <div className="CPUActions-page">
              <h3>CPU action:</h3>
              <ul>
                {awayActions.map((action, index) => (
                  <li key={index}>
                    CPU try to {action.actionType} with {action.player}:{" "}
                    {action.success ? "Successo" : "Fallito"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button onClick={() => navigate("/main-menu")} className="button-page">
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
