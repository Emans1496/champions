import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import "../components/style/MainMenu.scss";
import ChampionsLogo from "../assets/img/champions logo.png";
import { AudioContext } from "../context/AudioContext";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  const audioRef = useContext(AudioContext);
  const navigate = useNavigate();
  const [warning, setWarning] = React.useState(false);

  function openWarning() {
    if (!warning) {
      setWarning(true);
      setTimeout(() => setWarning(false), 2000);
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  function goToCredits() {
    setTimeout(() => {
      navigate("/credits");
    }, 0);
  }

  function goToSelectTeam() {
    navigate("/select-team"); // Corrected path
  }

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="MainMenu">
        {warning && (
          <div className="Warning">
            <p>This function is not available yet.</p>
          </div>
        )}
        <div className="ContentMenu">
          <img src={ChampionsLogo} className="ChampionsLogoMenu" alt="Logo" />
          <ul className="MenuList">
            <li>
              <span onClick={goToSelectTeam}>Play Match</span>
            </li>
            <li>
              <span onClick={openWarning}>Collection</span>
            </li>
            <li>
              <span onClick={openWarning}>Tournament</span>
            </li>
            <li>
              <span onClick={openWarning}>Multiplayer</span>
            </li>
            <li>
              <span onClick={openWarning}>Leaderboard</span>
            </li>
            <li>
              <span onClick={openWarning}>Settings</span>
            </li>
            <li>
              <span onClick={togglePlayPause}>Music Play/Stop</span>
            </li>
            <li>
              <span onClick={goToCredits}>Credits</span>
            </li>
          </ul>
          </div>
        </div>
    </CSSTransition>
  );
}

export default MainMenu;
