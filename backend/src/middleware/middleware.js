import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const middleware = (requiredRoles = []) => {
    return (req, res, next) => {
        const authorizationHeader = req.headers["authorization"];

        if (!authorizationHeader) {
            return res.status(401).json({
                statusCode: 401,
                message: "Authorization header is missing",
            });
        }

        const token = authorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "Token is missing",
            });
        }

        jwt.verify(token, process.env.JWTTOKENSECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    statusCode: 403,
                    message: "Token is invalid or expired",
                });
            }


            req.user = user;
            console.log(user.role, "user");
            console.log(requiredRoles, "requiredRoles");




            if (
                requiredRoles.length > 0 &&
                !requiredRoles.some((role) => new Set(user.role).has(role))
            ) {
                return res.status(403).json({
                    statusCode: 403,
                    message: "You do not have permission to access this resource",
                });
            }

            next(); // Tiếp tục xử lý request
        });
    };
};

export default middleware;
