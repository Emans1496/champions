// Match.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Card from "../views/Card";
import { getPlayers } from "../API/players";
import "../components/style/Match.scss";
import { ClipLoader } from "react-spinners";
import ChampionsLogo from "../assets/img/champions logo.png";

const realMadridBanner =
  "https://upload.wikimedia.org/wikipedia/it/thumb/0/0c/Real_Madrid_CF_logo.svg/800px-Real_Madrid_CF_logo.svg.png";
const barcellonaBanner =
  "https://upload.wikimedia.org/wikipedia/it/0/07/Fc_barcelona.png";
const laLigaLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/314px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png";

export default function Match() {
  const location = useLocation();
  const navigate = useNavigate();
  const { homeTeam = "Real Madrid", awayTeam = "Barcelona" } =
    location.state || {};

  const homeTeamLogo =
    homeTeam === "Barcelona" ? barcellonaBanner : realMadridBanner;
  const awayTeamLogo =
    awayTeam === "Barcelona" ? barcellonaBanner : realMadridBanner;

  const [isLoading, setIsLoading] = useState(true); 
  const [modalTeamHome, setModalTeamHome] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null); 
  const [possession, setPossession] = useState("home");
  const [currentTurn, setCurrentTurn] = useState("home");
  const [phase, setPhase] = useState("action");
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [actionMessage, setActionMessage] = useState(null);
  const [goalModal, setGoalModal] = useState(null);
  const [successRates, setSuccessRates] = useState({
    passCount: 0,
    crossCount: 0,
    dribbleCount: 0,
  });
  const [cpuSuccessRates, setCpuSuccessRates] = useState({
    passCount: 0,
    crossCount: 0,
    dribbleCount: 0,
  });
  const [turnNumber, setTurnNumber] = useState(1);

  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);

  // Stati per registrare le azioni durante la partita
  const [homeActions, setHomeActions] = useState([]);
  const [awayActions, setAwayActions] = useState([]);

  // Messaggi di successo e fallimento per le azioni
  const successMessages = {
    Pass: ["Ottimo passaggio!", "Passaggio riuscito!", "Passaggio brillante!"],
    Cross: ["Cross riuscito!", "Ottimo cross!", "Cross ben eseguito!"],
    Shot: ["GOOOOOLLLL!", "È un gol!", "Che tiro fantastico!"],
    Dribble: [
      "Dribbling riuscito!",
      "Ha superato il difensore!",
      "Dribbling abilissimo!",
    ],
    Tackle: ["Contrasto riuscito!", "Ottimo contrasto!", "Palla recuperata!"],
  };

  const failureMessages = {
    Pass: [
      "Passaggio intercettato!",
      "Passaggio fallito!",
      "Avversario ruba la palla!",
    ],
    Cross: [
      "Cross bloccato!",
      "Cross non riuscito!",
      "Difensore respinge il cross!",
    ],
    Shot: ["Tiro fuori!", "Parata del portiere!", "Tiro impreciso!"],
    Dribble: [
      "Dribbling fallito!",
      "Difensore recupera la palla!",
      "Perso il possesso!",
    ],
    Tackle: [
      "Contrasto mancato!",
      "Fallito il contrasto!",
      "Avversario evita il contrasto!",
    ],
  };

  useEffect(() => {
    // Carica i giocatori per entrambe le squadre
    async function fetchData() {
      const homePlayersData = await getPlayers(homeTeam);
      const awayPlayersData = await getPlayers(awayTeam);

      setHomePlayers(homePlayersData);
      setAwayPlayers(awayPlayersData);

      // Imposta isLoading su false quando i dati sono pronti
      setIsLoading(false);
    }
    fetchData();
  }, [homeTeam, awayTeam]);

  // Inizializzazione del gioco dopo il caricamento
  useEffect(() => {
    if (!isLoading) {
      setPossession("home");
      setCurrentTurn("home");
      setPhase("action");
    }
  }, [isLoading]);

  // Timer che inizia dopo il caricamento
  useEffect(() => {
    let timer;
    if (!isLoading && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining <= 0) {
      // Tempo scaduto, naviga al componente MatchStats passando i dati
      navigate("/match-stats", {
        state: {
          score,
          homeTeam,
          awayTeam,
          homeTeamLogo,
          awayTeamLogo,
          homeActions,
          awayActions,
        },
      });
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [
    isLoading,
    timeRemaining,
    navigate,
    score,
    homeTeam,
    awayTeam,
    homeTeamLogo,
    awayTeamLogo,
    homeActions,
    awayActions,
  ]);

  // useEffect per gestire le azioni della CPU
  useEffect(() => {
    if (!isLoading) {
      if (
        currentTurn === "away" &&
        possession === "away" &&
        phase === "action"
      ) {
        cpuAction();
      }
      if (
        currentTurn === "away" &&
        possession === "home" &&
        phase === "defense"
      ) {
        cpuDefense();
      }
    }
  }, [currentTurn, possession, phase, isLoading]);

  function closeSetModalTeamHome() {
    setModalTeamHome(false);
  }

  function openModalTeamHome(player) {
    if (currentTurn !== "home") return; // Solo l'utente può aprire il modale
    setSelectedPlayer(player);
    setModalTeamHome(true);
  }

  // Funzione per mappare le statistiche del giocatore ai modificatori basati sulle fasce
  function getStatModifier(stat) {
    if (stat >= 90) {
      return 0.2; // Eccellente
    } else if (stat >= 80) {
      return 0.15; // Alto
    } else if (stat >= 60) {
      return 0.1; // Medio
    } else {
      return 0.05; // Basso
    }
  }

  function calculateSuccessPreview(actionType, playerStats, isCpu = false) {
    let baseSuccess = 0;
    let statModifier = 0;
    let overallModifier = getStatModifier(playerStats.overall);

    const rates = isCpu ? cpuSuccessRates : successRates;

    switch (actionType) {
      case "Pass":
        baseSuccess = 0.3 - rates.passCount * 0.05; // Base 30%
        statModifier = getStatModifier(playerStats.passaggio);
        break;
      case "Cross":
        baseSuccess = 0.25 - rates.crossCount * 0.05; // Base 25%
        statModifier = getStatModifier(playerStats.passaggio);
        break;
      case "Shot":
        baseSuccess =
          0.1 +
          rates.passCount * 0.03 +
          rates.crossCount * 0.05 +
          rates.dribbleCount * 0.07;
        statModifier = getStatModifier(playerStats.tiro);
        break;
      case "Dribble":
        baseSuccess = 0.2; // Base 20%
        statModifier = getStatModifier(playerStats.dribbling);
        break;
      case "Tackle":
        baseSuccess = 0.05; // Base 5%
        const defenseStat = (playerStats.difesa + playerStats.fisico) / 2;
        statModifier = getStatModifier(defenseStat);
        break;
      default:
        break;
    }

    const successChance = Math.min(
      Math.max((baseSuccess + statModifier + overallModifier) * 100, 5),
      90 // Limita tra 5% e 90%
    );

    return {
      percentage: successChance.toFixed(1),
    };
  }

  function handleAction(actionType) {
    setModalTeamHome(false);

    const playerStats = selectedPlayer;

    setActionMessage(
      `Tentativo di "${actionType}" con ${playerStats.strPlayer}...`
    );

    const { percentage } = calculateSuccessPreview(actionType, playerStats);
    const successChance = parseFloat(percentage);
    const randomNumber = Math.random() * 100;

    setTimeout(() => {
      const actionSuccess = randomNumber <= successChance;

      // Aggiungi l'azione alle statistiche dell'utente
      setHomeActions((prevActions) => [
        ...prevActions,
        {
          player: playerStats.strPlayer,
          actionType,
          success: actionSuccess,
        },
      ]);

      if (actionSuccess) {
        // Messaggio di successo
        const successMsg =
          successMessages[actionType][
            Math.floor(Math.random() * successMessages[actionType].length)
          ];
        setActionMessage(successMsg);

        if (actionType === "Shot") {
          setScore((prevScore) => ({
            ...prevScore,
            home: prevScore.home + 1,
          }));
          setGoalModal({
            scorer: playerStats.strPlayer,
            team: "home",
            playerImage: playerStats.strCutout || "defaultPlayerImg.png",
          });
          setTimeout(() => setGoalModal(null), 2000);
          resetGameState();
          return;
        }
      } else {
        // Messaggio di fallimento
        const failureMsg =
          failureMessages[actionType][
            Math.floor(Math.random() * failureMessages[actionType].length)
          ];
        setActionMessage(failureMsg);
        // Se l'azione fallisce, il possesso passa alla CPU
        setPossession("away");
        setCurrentTurn("away");
        setPhase("action");
        return;
      }

      // Aggiorna successRates
      setSuccessRates((prevRates) => {
        let newRates = { ...prevRates };
        if (actionType === "Pass") {
          newRates.passCount = prevRates.passCount + 1;
        } else if (actionType === "Cross") {
          newRates.crossCount = prevRates.crossCount + 1;
        } else if (actionType === "Dribble") {
          newRates.dribbleCount = prevRates.dribbleCount + 1;
        } else {
          // Reset dei conteggi per altre azioni
          newRates = { passCount: 0, crossCount: 0, dribbleCount: 0 };
        }
        return newRates;
      });

      setPhase("defense"); // Passa alla fase di difesa
      setCurrentTurn("away"); // La CPU tenterà un Contrasto
    }, 1000);
  }

  function handleDefenseAction(player) {
    // L'utente tenta un Contrasto durante la fase di difesa
    setModalTeamHome(false);
    setSelectedPlayer(player); // Imposta il giocatore selezionato per il contrasto
    const defenderStats = player; // Giocatore selezionato

    setActionMessage(
      `Tentativo di Contrasto con ${defenderStats.strPlayer}...`
    );

    const { percentage } = calculateSuccessPreview("Tackle", defenderStats);
    const successChance = parseFloat(percentage);
    const randomNumber = Math.random() * 100;

    setTimeout(() => {
      const actionSuccess = randomNumber <= successChance;

      // Aggiungi l'azione alle statistiche dell'utente
      setHomeActions((prevActions) => [
        ...prevActions,
        {
          player: defenderStats.strPlayer,
          actionType: "Tackle",
          success: actionSuccess,
        },
      ]);

      if (actionSuccess) {
        // Messaggio di successo
        const successMsg =
          successMessages["Tackle"][
            Math.floor(Math.random() * successMessages["Tackle"].length)
          ];
        setActionMessage(successMsg);
        // Il possesso passa all'utente
        setPossession("home");
        setCurrentTurn("home");
        setPhase("action");
        setCpuSuccessRates({
          passCount: 0,
          crossCount: 0,
          dribbleCount: 0,
        });
        setTimeout(() => setActionMessage(null), 2000);
      } else {
        // Messaggio di fallimento
        const failureMsg =
          failureMessages["Tackle"][
            Math.floor(Math.random() * failureMessages["Tackle"].length)
          ];
        setActionMessage(failureMsg);
        // L'avversario mantiene il possesso e continua con un'altra azione
        setCurrentTurn("away");
        setPhase("action");
      }
    }, 1000);
  }

  function cpuAction() {
    const cpuPlayers = awayPlayers.slice(0, 5); // Limita ai primi 5 giocatori
    if (cpuPlayers.length === 0) {
      // Se i dati non sono ancora disponibili, riprova dopo un breve ritardo
      setTimeout(cpuAction, 500);
      return;
    }

    if (possession === "away" && currentTurn === "away" && phase === "action") {
      // La CPU esegue un'azione
      const possibleActions = ["Pass", "Cross", "Shot", "Dribble"];
      const actionType =
        possibleActions[Math.floor(Math.random() * possibleActions.length)];

      const randomPlayer =
        cpuPlayers[Math.floor(Math.random() * cpuPlayers.length)];

      setActionMessage(
        `La CPU tenta "${actionType}" con ${randomPlayer.strPlayer}...`
      );

      const { percentage } = calculateSuccessPreview(
        actionType,
        randomPlayer,
        true // Indica che è la CPU
      );
      const successChance = parseFloat(percentage);
      const randomNumber = Math.random() * 100;

      setTimeout(() => {
        const actionSuccess = randomNumber <= successChance;

        // Aggiungi l'azione alle statistiche della CPU
        setAwayActions((prevActions) => [
          ...prevActions,
          {
            player: randomPlayer.strPlayer,
            actionType,
            success: actionSuccess,
          },
        ]);

        if (actionSuccess) {
          // Messaggio di successo
          const successMsg =
            successMessages[actionType][
              Math.floor(Math.random() * successMessages[actionType].length)
            ];
          setActionMessage(successMsg);

          if (actionType === "Shot") {
            setScore((prevScore) => ({
              ...prevScore,
              away: prevScore.away + 1,
            }));
            setGoalModal({
              scorer: randomPlayer.strPlayer,
              team: "away",
              playerImage: randomPlayer.strCutout || "defaultPlayerImg.png",
            });
            setTimeout(() => setGoalModal(null), 2000);
            resetGameState();
            return;
          }

          // Aggiorna cpuSuccessRates
          setCpuSuccessRates((prevRates) => {
            let newRates = { ...prevRates };
            if (actionType === "Pass") {
              newRates.passCount = prevRates.passCount + 1;
            } else if (actionType === "Cross") {
              newRates.crossCount = prevRates.crossCount + 1;
            } else if (actionType === "Dribble") {
              newRates.dribbleCount = prevRates.dribbleCount + 1;
            } else {
              // Reset dei conteggi per altre azioni
              newRates = { passCount: 0, crossCount: 0, dribbleCount: 0 };
            }
            return newRates;
          });

          // La CPU ha successo, passa alla fase di difesa dell'utente
          setPhase("defense");
          setCurrentTurn("home"); // L'utente può tentare un Contrasto
        } else {
          // Messaggio di fallimento
          const failureMsg =
            failureMessages[actionType][
              Math.floor(Math.random() * failureMessages[actionType].length)
            ];
          setActionMessage(failureMsg);
          // Il possesso passa all'utente
          setPossession("home");
          setCurrentTurn("home");
          setPhase("action");
          setCpuSuccessRates({
            passCount: 0,
            crossCount: 0,
            dribbleCount: 0,
          });
          setTimeout(() => setActionMessage(null), 2000);
        }
      }, 1000);
    }
  }

  function cpuDefense() {
    const cpuPlayers = awayPlayers.slice(0, 5); // Limita ai primi 5 giocatori

    if (cpuPlayers.length === 0) {
      // Se i dati non sono ancora disponibili, riprova dopo un breve ritardo
      setTimeout(cpuDefense, 500);
      return;
    }

    if (
      possession === "home" &&
      currentTurn === "away" &&
      phase === "defense"
    ) {
      const defenderStats =
        cpuPlayers[Math.floor(Math.random() * cpuPlayers.length)];

      setActionMessage(
        `La CPU tenta un Contrasto con ${defenderStats.strPlayer}...`
      );

      const { percentage } = calculateSuccessPreview(
        "Tackle",
        defenderStats,
        true
      );
      const successChance = parseFloat(percentage);
      const randomNumber = Math.random() * 100;

      setTimeout(() => {
        const actionSuccess = randomNumber <= successChance;

        // Aggiungi l'azione alle statistiche della CPU
        setAwayActions((prevActions) => [
          ...prevActions,
          {
            player: defenderStats.strPlayer,
            actionType: "Tackle",
            success: actionSuccess,
          },
        ]);

        if (actionSuccess) {
          // Messaggio di successo
          const successMsg =
            successMessages["Tackle"][
              Math.floor(Math.random() * successMessages["Tackle"].length)
            ];
          setActionMessage(successMsg);
          // Il possesso passa alla CPU
          setPossession("away");
          setCurrentTurn("away");
          setPhase("action");
          setSuccessRates({
            passCount: 0,
            crossCount: 0,
            dribbleCount: 0,
          });
        } else {
          // Messaggio di fallimento
          const failureMsg =
            failureMessages["Tackle"][
              Math.floor(Math.random() * failureMessages["Tackle"].length)
            ];
          setActionMessage(failureMsg);
          // L'utente mantiene il possesso e può eseguire un'altra azione
          setCurrentTurn("home");
          setPhase("action");
          setTimeout(() => setActionMessage(null), 2000);
        }
      }, 1000);
    }
  }

  function resetGameState() {
    setSuccessRates({ passCount: 0, crossCount: 0, dribbleCount: 0 });
    setCpuSuccessRates({ passCount: 0, crossCount: 0, dribbleCount: 0 });
    setTurnNumber((prev) => prev + 1);

    // Dopo un gol, il possesso passa all'altra squadra
    const nextPossession = possession === "home" ? "away" : "home";
    setPossession(nextPossession);
    setCurrentTurn(nextPossession);
    setPhase("action");
  }

  // Schermata di caricamento
  if (isLoading) {
    return (
      <div className="loading-screen">
        <img
          src={ChampionsLogo}
          className="loading-logo"
          style={{ width: "400px", marginBottom: "50px" }}
          alt="Champions Logo"
        />
        <ClipLoader color="#ADF132" size={50} />
      </div>
    );
  }

  return (
    <>
      {hoveredPlayer &&
        ReactDOM.createPortal(
          <div
            className="hover-modal"
          >
            <div className="hoverModalTop">
            <img src={ChampionsLogo} className="hoverModalLogo" />
            </div>
            <img
              src={
                hoveredPlayer.renderImage &&
                hoveredPlayer.renderImage !== "null"
                  ? hoveredPlayer.renderImage
                  : hoveredPlayer.playerImage &&
                    hoveredPlayer.playerImage !== "null"
                  ? hoveredPlayer.playerImage
                  : "defaultPlayerImg.png"
              }
              alt={hoveredPlayer.strPlayer}
              style={{ width: "400px" }}
            />
            <h1>{hoveredPlayer.strPlayer}</h1>
            <p>{hoveredPlayer.strTeam}</p>
            <p>{hoveredPlayer.strNationality}</p>
            <p>{hoveredPlayer.strHeight}</p>
            <p>{hoveredPlayer.strWeight}</p>
            <p>{hoveredPlayer.strAge}</p>
            <p>{hoveredPlayer.strWage}</p>
            <p>{hoveredPlayer.strWorkRate}</p>         
            </div>,
          document.body
        )}

      {goalModal && (
        <div className="goalModal">
          <div className="teamModal">
            <h1 style={{ fontSize: "100px" }}>GOOOOOLLLL!</h1>
            <img
              src={goalModal.team === "home" ? homeTeamLogo : awayTeamLogo}
              alt="Logo della Squadra"
              className="teamLogoGoalModal"
            />
          </div>
          <div className="playerModal">
            <img
              src={
                goalModal.playerImage && goalModal.playerImage !== "null"
                  ? goalModal.playerImage
                  : "defaultPlayerImg.png"
              }
              alt="Immagine del Giocatore"
            />
          </div>
        </div>
      )}
      <div className="turnInfo">
        <h2>Turn {turnNumber}</h2>
        <h3>
          {possession === "home" ? "Is your turn!" : "Is opponent's turn!"}
        </h3>
      </div>
      {actionMessage && <div className="actionMessage">{actionMessage}</div>}
      {modalTeamHome && selectedPlayer && (
        <div className="Modal" onClick={closeSetModalTeamHome}>
          <div className="ModalContentPlayer">
            <h1>{selectedPlayer.strPlayer}</h1>
            <div className="playerChoose">
              {phase === "action" &&
                ["Pass", "Cross", "Shot", "Dribble"].map((actionType) => {
                  // Mostra le azioni disponibili solo durante la fase di azione
                  const preview = calculateSuccessPreview(
                    actionType,
                    selectedPlayer
                  );
                  return (
                    <div key={actionType} className="actionPreview" onClick={() => handleAction(actionType)}>
                      <p>
                        {actionType}
                      </p>
                      <p>Success Rate {preview.percentage}%</p>
                    </div>
                  );
                })}
              {phase === "defense" && (
                <div className="actionPreview" onClick={() => handleDefenseAction(selectedPlayer)}>
                  <p>
                    Tackle
                  </p>
                  <p>
                    Success Rate {" "}
                    {
                      calculateSuccessPreview("Tackle", selectedPlayer)
                        .percentage
                    }
                    %
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="match">
          <div className="scoreBox">
            <div className="leagueLogo">
              <img
                src={laLigaLogo}
                style={{ width: "80px" }}
                alt="Logo La Liga"
              />
            </div>
            <div className="teamss">
              <div className={`teamA ${possession === "away" ? "active" : ""}`}>
                <img
                  src={awayTeamLogo}
                  className="teamLogo"
                  alt="Logo Squadra Ospite"
                />
                <h2 className="teamName">
                  {awayTeam === "Barcelona" ? "BAR" : "REA"}
                </h2>
                <h1 className="scoreTeam">{score.away}</h1>
              </div>
              <div className={`teamB ${possession === "home" ? "active" : ""}`}>
                <img
                  src={homeTeamLogo}
                  className="teamLogo"
                  alt="Logo Squadra Casa"
                />
                <h2 className="teamName">
                  {homeTeam === "Barcelona" ? "BAR" : "REA"}
                </h2>
                <h1 className="scoreTeam">{score.home}</h1>
              </div>
            </div>
          </div>
          <div className="teams">
            <div className="teamAway">
              <Card
                teamName={awayTeam}
                className="teamAway"
                onPlayerHover={(player) => setHoveredPlayer(player)}
              />
            </div>
            <div className="teamHome">
              <Card
                teamName={homeTeam}
                className="teamHome"
                onClick={(player) => openModalTeamHome(player)}
                isDisabled={currentTurn !== "home"}
                onPlayerHover={(player) => setHoveredPlayer(player)}
              />
            </div>
          </div>
        </div>
        <div className="timer">
          <p>
            {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60 < 10 ? "0" : ""}
            {timeRemaining % 60}
          </p>
        </div>
      </div>
    </>
  );
}
