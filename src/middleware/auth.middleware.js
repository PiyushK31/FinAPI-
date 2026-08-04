const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");


async function authMiddleware(req, res, next) {
    const token = req.cookies.token  || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access. Token is missing."
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findBtId(decoded.userId)

        req.user = user;
        next();
    }
    
    catch(error){
        return res.status(401).json({
            messsage: "Unauthorized access. Invalid token."
        })
    }
}

module.exports = {
    authMiddleware
}