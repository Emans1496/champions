// StartGameScreen.js

import React, { useState, useContext, useEffect } from "react";
import MbappeLogoImage from "../assets/img/MbappeSfondo.png";
import ChampionsLogo from "../assets/img/champions logo.png";
import "../components/style/StartGameScreen.scss";
import { useNavigate } from "react-router-dom";
import { AudioContext } from "../context/AudioContext";
import { CSSTransition } from "react-transition-group";

export default function StartGameScreen() {
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const audioRef = useContext(AudioContext);


  useEffect(() => {
    if (!showModal && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Autoplay bloccato", error);
      });
    }
  }, [showModal, audioRef]);

  function closeModal() {
    setShowModal(false);
  }

  function goToMainMenu() {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/main-menu");
    }, 0);
  }

  return (
    <>
      {showModal && (
        <div className="Modal">
          <div className="ModalContent">
            <img src={ChampionsLogo} alt="Champions Logo" style={{ width: "400px", padding: "50px" }} />
            <h1>READ THIS FIRST</h1>
            <p style={{ width: "50%" }}>
              This application is a non-commercial project created solely for
              educational purposes and portfolio development. All rights to the
              names, images, and likenesses of the football players featured in
              this game are owned by their respective owners and
              representatives. This project is not endorsed by, affiliated with,
              or connected to any official player, club, or organization, and it
              does not generate any revenue. The sole purpose of this game is to
              showcase development skills and should not be considered an
              official or commercial product.
            </p>
            <button className="ModalBtn" onClick={closeModal}>
              I understood
            </button>
          </div>
        </div>
      )}
      <CSSTransition
        in={true}
        appear={true}
        timeout={1000}
        classNames="fade"
        unmountOnExit
      >
        <div className="StartGameScreen">
          <img
            src={ChampionsLogo}
            className="ChampionsLogo"
            alt="Champions Logo"
          />
          <img
            src={MbappeLogoImage}
            className="MbappeLogoImage"
            alt="Mbappe Logo"
          />
          <button className="JoinNowBtn" onClick={goToMainMenu}>
            JOIN NOW
          </button>
        </div>
      </CSSTransition>
    </>
  );
}
