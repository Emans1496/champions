import "../components/style/SelectTeamMenu.scss";
import { CSSTransition } from "react-transition-group";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTeamMenu() {
  const loghi = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/it/thumb/0/0c/Real_Madrid_CF_logo.svg/800px-Real_Madrid_CF_logo.svg.png",
      name: "Real Madrid",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/it/0/07/Fc_barcelona.png",
      name: "Barcelona",
    },
  ];
  const [team, setTeam] = React.useState(1);
  const [team2, setTeam2] = React.useState(0);
  const [warning, setWarning] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const [buttonTextHome, setButtonTextHome] = React.useState("CONFIRM");
  const [buttonTextAway, setButtonTextAway] = React.useState("CONFIRM");
  const navigate = useNavigate();

  function matchReady() {
    navigate("/match", { state: { homeTeam: loghi[team].name, awayTeam: loghi[team2].name } });
  }
  

  function returnToMainMenu() {
    setTimeout(() => navigate("/main-menu"), 500);
  }

  React.useEffect(() => {
    if (buttonTextHome === "READY" && buttonTextAway === "READY") {
      matchReady();
    }
  }, [buttonTextHome, buttonTextAway]);

  const handleClickConfirmAway = () => {
    setButtonTextAway((prevText) =>
      prevText === "CONFIRM" ? "READY" : "CONFIRM"
    );
  };

  const handleClickConfirmHome = () => {
    setButtonTextHome((prevText) =>
      prevText === "CONFIRM" ? "READY" : "CONFIRM"
    );
  };
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  function previousTeam() {
    setTeam((prevTeam) => {
      const newIndex = prevTeam > 0 ? prevTeam - 1 : loghi.length - 1;
      console.log(loghi[newIndex]);
      return newIndex;
    });
  }

  function nextTeam() {
    setTeam((prevTeam) => {
      const newIndex = prevTeam < loghi.length - 1 ? prevTeam + 1 : 0;
      console.log(loghi[newIndex]);
      return newIndex;
    });
  }

  function openWarning() {
    if (!warning) {
      setWarning(true);
      setTimeout(() => setWarning(false), 2000);
    }
  }

  function nextTeam2() {
    setTeam2((prevTeam) => {
      const newIndex = prevTeam < loghi.length - 1 ? prevTeam + 1 : 0;
      console.log(loghi[newIndex]);
      return newIndex;
    });
  }

  function previousTeam2() {
    setTeam2((prevTeam) => {
      const newIndex = prevTeam > 0 ? prevTeam - 1 : loghi.length - 1;
      console.log(loghi[newIndex]);
      return newIndex;
    });
  }

  return (
    <>
      {warning && (
        <div className="WarningLeague">
          <p>No other league available at the moment.</p>
        </div>
      )}
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="SelectTeamMenu">
          <h1 className="Title">CLASSIC MATCH</h1>
          <div className="FirstTeamSelection">
            <div className="Team1">
              <div className="home">HOME</div>
              <div className="legaSelector">
                <img
                  className="ChooseArrowLega"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={openWarning}
                />
                <img
                  className="logoLega"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png"
                />
                <img
                  className="ChooseArrowLegaLeft"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={openWarning}
                />
              </div>
              <div className="teamInfo">
                <img
                  className="ChooseArrowLega"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={previousTeam}
                />
                <img className="logo" src={loghi[team].logo} />
                <img
                  className="ChooseArrowLegaLeft"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={nextTeam}
                />
              </div>
              <h2>{loghi[team].name}</h2>
              <img
                className="rating"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/663/927/small/5-star-rating-review-star-transparent-free-png.png"
              />
              <div className="ConfirmButtonHome">
                <h2
                  onClick={handleClickConfirmHome}
                  className={`confirmBtn ${buttonTextHome === "READY" ? "clicked" : ""}`}
                >
                  {buttonTextHome}
                </h2>
              </div>
            </div>

            <div className="vs">
              <h2>VS</h2>
            </div>

            <div className="Team1">
              <div className="home">AWAY</div>
              <div className="legaSelector">
                <img
                  className="ChooseArrowLega"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={openWarning}
                />
                <img
                  className="logoLega"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png"
                />
                <img
                  className="ChooseArrowLegaLeft"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={openWarning}
                />
              </div>
              <div className="teamInfo">
                <img
                  className="ChooseArrowLega"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={previousTeam2}
                />
                <img className="logo" src={loghi[team2].logo} />
                <img
                  className="ChooseArrowLegaLeft"
                  src="https://static.thenounproject.com/png/5074877-200.png"
                  onClick={nextTeam2}
                />
              </div>
              <h2>{loghi[team2].name}</h2>
              <img
                className="rating"
                src="https://static.vecteezy.com/system/resources/thumbnails/009/663/927/small/5-star-rating-review-star-transparent-free-png.png"
              />
              <div className="ConfirmButtonAway">
                <h2
                  onClick={handleClickConfirmAway}
                  className={`confirmBtn ${buttonTextAway === "READY" ? "clicked" : ""}`}
                >
                  {buttonTextAway}
                </h2>
              </div>
            </div>
            <h3 onClick={returnToMainMenu} className="returnToMainMenu">
              Return to main menu
            </h3>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}