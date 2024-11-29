import axiosInstance from "./axiosInstance";

export const getBarcellonaTeam = async () => {
    try {
        const response = await axiosInstance.get("/searchteams.php?t=Barcellona");
        return response.data.teams[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}