import axiosInstance from "./api"


const getDashboard = async () => {
    try {
        const res = await axiosInstance.get("/dashboard",

        )
        return res.data
    } catch (error) {

    }

}


export const DashboardService = {
    getDashboard,

}