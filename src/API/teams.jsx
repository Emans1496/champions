import axiosInstance from "./axiosInstance";

export const getTeam = async (teamName) => {
  try {
    const response = await axiosInstance.get(`/searchteams.php?t=${encodeURIComponent(teamName)}`);
    return response.data.teams[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
