import axiosInstance from "./api"

export type CompanyProps = {

    companyName: string;
    title: string;
    location: string;
    status: string;
    tech: string;
    salary: string;
    submissionDate: string

};
const getCompany = async (filter: Record<string, any>) => {
    try {
        const res: any = await axiosInstance.get("/company",
            {
                params: filter
            }
        )
        return res
    } catch (error) {

    }

}
const deleteCompany = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/company/${id}`)
        return res
    } catch (error) {

    }

}
const updateCompany = async (id: string, body: CompanyProps) => {
    try {
        const res: any = await axiosInstance.put(`/company/${id}`, body)
        return res.data
    } catch (error) {

    }

}
const createCompany = async (body: CompanyProps) => {
    try {
        const res = await axiosInstance.post(`/company`, body)
        return res.data
    } catch (error) {

    }

}


export const CompanyService = {
    getCompany,
    deleteCompany,
    updateCompany,
    createCompany
}