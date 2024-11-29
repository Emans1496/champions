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
    navigate("/select-team-menu");
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
          <img src={ChampionsLogo} className="ChampionsLogoMenu" />
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
              <span onClick={goToCredits}>Credits</span>
            </li>
          </ul>
          <div className="AudioPlayer">
            <img
              src="https://i1.sndcdn.com/artworks-000016845084-8utmr3-t500x500.jpg"
              style={{ width: "100px", marginLeft: "10px" }}
            />
            <h3>Jerk it Out (Caesars)</h3>
            <button onClick={togglePlayPause} className="PlayMusicButton">
              {audioRef.current?.paused ? (
                <img src="https://img.freepik.com/premium-vector/play-pause-icon-set-music-audio-video-start-pause-button-vector-symbol-black-filled-outlined-style_268104-22577.jpg" />
              ) : (
                <img src="https://img.freepik.com/premium-vector/play-pause-icon-set-music-audio-video-start-pause-button-vector-symbol-black-filled-outlined-style_268104-22577.jpg" />
              )}
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default MainMenu;
