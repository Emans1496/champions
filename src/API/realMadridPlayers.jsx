import axiosInstance from "./axiosInstance";

const realMadridPlayers = [
  { name: "Kylian Mbappe", velocità: 97, tiro: 89, passaggio: 80, dribbling: 92, difesa: 39, fisico: 76, overall: 91 },
  { name: "Luka Modric", velocità: 74, tiro: 76, passaggio: 89, dribbling: 87, difesa: 70, fisico: 60, overall: 85 },
  { name: "Vinicius Junior", velocità: 95, tiro: 78, passaggio: 74, dribbling: 89, difesa: 30, fisico: 66, overall: 83 },
  { name: "Aurelien Tchouameni", velocità: 68, tiro: 60, passaggio: 70, dribbling: 72, difesa: 80, fisico: 78, overall: 73 },
  { name: "Edoardo Camavinga", velocità: 76, tiro: 65, passaggio: 75, dribbling: 77, difesa: 73, fisico: 75, overall: 73 },
  { name: "Jude Bellingham", velocità: 78, tiro: 74, passaggio: 79, dribbling: 81, difesa: 74, fisico: 79, overall: 77 },
  { name: "Ferland Mendy", velocità: 85, tiro: 40, passaggio: 66, dribbling: 78, difesa: 77, fisico: 83, overall: 71 },
  { name: "David Alaba", velocità: 77, tiro: 65, passaggio: 75, dribbling: 73, difesa: 84, fisico: 75, overall: 75 },
  { name: "Dani Carvajal", velocità: 82, tiro: 50, passaggio: 70, dribbling: 72, difesa: 82, fisico: 78, overall: 72 },
  { name: "Brahim Díaz", velocità: 83, tiro: 65, passaggio: 70, dribbling: 84, difesa: 35, fisico: 60, overall: 66 },
  { name: "Dani Ceballos", velocità: 70, tiro: 60, passaggio: 78, dribbling: 79, difesa: 65, fisico: 68, overall: 70 },
  { name: "Federico Valverde", velocità: 85, tiro: 75, passaggio: 79, dribbling: 80, difesa: 75, fisico: 82, overall: 79 },
  { name: "Arda Guler", velocità: 74, tiro: 67, passaggio: 73, dribbling: 78, difesa: 30, fisico: 60, overall: 63 },
  { name: "Eder Militao", velocità: 82, tiro: 40, passaggio: 60, dribbling: 66, difesa: 85, fisico: 84, overall: 70 },
  { name: "Antonio Rudiger", velocità: 83, tiro: 35, passaggio: 63, dribbling: 64, difesa: 86, fisico: 85, overall: 69 },
];

export const getPlayers = async (team = "Real_Madrid") => {
  try {
    const playersData = [];

    for (const player of realMadridPlayers) {
      const response = await axiosInstance.get(
        `/searchplayers.php?t=${team}&p=${player.name}`
      );
      if (response.data.player && response.data.player.length > 0) {
        const playerData = response.data.player[0];
        playersData.push({ ...playerData, ...player });
      }
    }

    return playersData;
  } catch (error) {
    console.error("Errore durante il caricamento dei calciatori:", error);
    return [];
  }
};
