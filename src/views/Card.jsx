// Card.jsx
import React, { useEffect, useState } from "react";
import { getPlayers } from "../API/players";
import { getTeam } from "../API/teams";
import "../components/style/Card.scss";

export default function Card({
  teamName,
  onClick,
  isDisabled,
  onPlayerHover,
}) {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      const teamData = await getTeam(teamName);
      if (teamData) {
        setTeam(teamData);
      }
    }
    fetchTeam();
  }, [teamName]);

  useEffect(() => {
    async function fetchPlayers() {
      const playersData = await getPlayers(teamName);
      if (playersData && playersData.length >= 5) {
        const shuffledPlayers = playersData.sort(() => 0.5 - Math.random());
        const selectedPlayers = shuffledPlayers.slice(0, 5);
        setPlayers(selectedPlayers);
      } else if (playersData) {
        setPlayers(playersData);
      } else {
        setPlayers([]);
      }
    }
    fetchPlayers();
  }, [teamName]);

  if (!players || players.length === 0) {
    return null; // Non mostrare nulla finché i giocatori non sono caricati
  }

  return (
    <>
      <div className="CardsContainer">
        {players.map((player, index) => (
          <div
            className={`Card ${isDisabled ? "disabled" : ""}`}
            key={index}
            onClick={() => {
              if (!isDisabled && onClick) {
                onClick(player);
              }
            }}
            onMouseEnter={() => {
              if (onPlayerHover) {
                onPlayerHover(player);
              }
            }}
            onMouseLeave={() => {
              if (onPlayerHover) {
                onPlayerHover(null);
              }
            }}
          >
            <div className="CardTop">
              <img
                src={
                  player.strCutout && player.strCutout !== "null"
                    ? player.strCutout
                    : "defaultPlayerImg.png"
                }
                className="PlayerImg"
                alt={player.strPlayer || "Giocatore Sconosciuto"}
              />
            </div>
            <div className="CardInfo">
              <p className="CardName">{player.strPlayer || "Sconosciuto"}</p>
              {/* <p className="CardPosition">{player.strPosition || "ND"}</p> */}
              <p className="CardOverall">{player.overall || "?"}</p>

              {team && (
                <img
                  className="teamBadge"
                  src={team.strBadge || "defaultBadge.png"}
                  alt={team.strTeam || "Team Sconosciuto"}
                />
              )}

              <div className="CardStatsName">
                <p>PAC</p>
                <p>SHO</p>
                <p>PAS</p>
                <p>DRI</p>
                <p>DEF</p>
                <p>PHY</p>
              </div>
              <div className="CardStatsValue">
                <p>{player.velocità || "?"}</p>
                <p>{player.tiro || "?"}</p>
                <p>{player.passaggio || "?"}</p>
                <p>{player.dribbling || "?"}</p>
                <p>{player.difesa || "?"}</p>
                <p>{player.fisico || "?"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
