import axiosInstance from "./axiosInstance";
import playersData from './playersData.json';

export const getPlayers = async (teamName) => {
  try {
    const teamPlayers = playersData[teamName];
    if (!teamPlayers) {
      console.error(`Nessun dato trovato per la squadra ${teamName}`);
      return [];
    }

    const playersDataArray = [];

    for (const player of teamPlayers) {
      const response = await axiosInstance.get(
        `/searchplayers.php?t=${encodeURIComponent(
          teamName
        )}&p=${encodeURIComponent(player.name)}`
      );
      if (response.data.player && response.data.player.length > 0) {
        const playerData = response.data.player[0];
        playersDataArray.push({
          ...playerData,
          ...player,
          renderImage: playerData.strRender || null, // Includi renderImage
          playerImage: playerData.strCutout || null, // Includi playerImage
        });
      } else {
        console.warn(`Nessun dato trovato per il giocatore ${player.name}`);
      }
    }

    return playersDataArray;
  } catch (error) {
    console.error("Errore durante il caricamento dei calciatori:", error);
    return [];
  }
};
