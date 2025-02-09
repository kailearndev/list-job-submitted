
import Company from "../models/companyModel.js"



const totalJobSubmited = async (req, res) => {
    const { id } = req.user
    try {
        const data = await Company.find({ owner: id }).countDocuments()
        const rejected = await Company.find({ owner: id, status: "rejected" }).countDocuments()
        const interview = await Company.find({ owner: id, status: "interview" }).countDocuments()
        const sent = await Company.find({ owner: id, status: "sent" }).countDocuments()
        const failed = await Company.find({ owner: id, status: "failed" }).countDocuments()

        return res.status(200).json({
            statusCode: 400,
            data: {
                totalJobSubmited: data,
                totalRejected: rejected,
                totalInterview: interview,
                totalSent: sent,
                totalFailed: failed
                // companiesByLocation: companiesByLocation

            }
        })
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            error: error.message
        })
    }
}

export const DashboardController = {
    totalJobSubmited
};
