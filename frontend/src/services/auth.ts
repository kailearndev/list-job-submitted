import axiosInstance from "./api"

interface LoginPayload {
    username: string
    password: string
}

const login = async (body: LoginPayload) => {
    try {
        const res = await axiosInstance.post("auth/login", body)
        return res
    } catch (error) {

    }

}
const getMe = async () => {
    try {
        const res = await axiosInstance.get("auth/me")
        return res.data
    } catch (error) {

    }

}


export const AuthService = {
    login,
    getMe
}