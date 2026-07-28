const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

/**
 * User Register Controller
 * POST /api/auth/register
 */
async function userRegisterController(req, res) {
    try {
        const { email, password, name } = req.body;

        const isExists = await userModel.findOne({ email });

        if (isExists) {
            return res.status(422).json({
                message: "User already exists with this email.",
                status: "failed",
            });
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "dev-secret",
            {
                expiresIn: "3d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            status: "success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("========== REGISTER ERROR ==========");
        console.error(error);
        console.error("====================================");

        return res.status(500).json({
            message: error.message,
            status: "failed",
        });
    }
}

/**
 * User Login Controller
 * POST /api/auth/login
 */
async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Email or Password is Invalid",
                status: "failed",
            });
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Email or Password is Invalid",
                status: "failed",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "dev-secret",
            {
                expiresIn: "3d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(200).json({
            message: "User Logged In successfully.",
            status: "success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("========== LOGIN ERROR ==========");
        console.error(error);
        console.error("=================================");

        return res.status(500).json({
            message: error.message,
            status: "failed",
        });
    }
}

module.exports = {
    userRegisterController,
    userLoginController
};