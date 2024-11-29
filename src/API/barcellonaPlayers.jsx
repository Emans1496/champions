import axiosInstance from "./axiosInstance";

const barcellonaPlayers = [
  { name: "Robert Lewandowski", velocità: 97, tiro: 89, passaggio: 80, dribbling: 92, difesa: 39, fisico: 76, overall: 91 },
  { name: "Lamine Yamal", velocità: 74, tiro: 76, passaggio: 89, dribbling: 87, difesa: 70, fisico: 60, overall: 85 },
  { name: "Fermin Lopez", velocità: 70, tiro: 60, passaggio: 78, dribbling: 79, difesa: 65, fisico: 68, overall: 70 },
  { name: "Raphinhia", velocità: 85, tiro: 80, passaggio: 90, dribbling: 88, difesa: 55, fisico: 73, overall: 88 },
  { name: "Frenkie de Jong", velocità: 85, tiro: 80, passaggio: 90, dribbling: 88, difesa: 55, fisico: 73, overall: 88 },
];

export const getPlayers = async (team = "Barcelona") => {
  try {
    const playersData = [];

    for (const player of barcellonaPlayers) {
      const response = await axiosInstance.get(
        `/searchplayers.php?t=${encodeURIComponent(team)}&p=${encodeURIComponent(player.name)}`
      );
      console.log("Response data for player:", response.data);
      if (response.data.player && response.data.player.length > 0) {
        const playerData = response.data.player[0];
        playersData.push({ ...playerData, ...player });
      } else {
        console.warn(`Nessun dato trovato per il giocatore ${player.name}`);
      }
    }

    return playersData;
  } catch (error) {
    console.error("Errore durante il caricamento dei calciatori:", error);
    return [];
  }
};
