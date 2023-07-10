import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User already exists." });   
        const userCreds = new User({
            name,
            email,
            password
        });
        const user = await userCreds.save();
        const jwttoken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
        const data = {
            token: jwttoken,
            userName: user.name,
            userEmail: user.email,
            userId: user._id
        }
        res.status(201).json(data);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "User doesn't exists." });
        if (password !== user.password)
            return res.status(400).json({ message: "Invalid credentials." });
        const jwttoken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
        const data = {
            token: jwttoken,
            userName: user.name,
            userEmail: user.email,
            userId: user._id
        }
        res.status(200).json(data);
    } catch(err) {
        res.status(400).json({ message: "Invalid credentials." });
    }
}

export const getUserInfo = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json({ message: "Unauthorized." }); 
        jwt.verify(token, process.env.ACCESS_TOKEN, async (err, decoded) => {
            if(err) return res.status(401).json({ message: "Unauthorized." });
            
            const userInfo = await User.findOne({ _id: decoded.id });
            const obj = {
                userName: userInfo.name,
                userEmail: userInfo.email,
                userId: userInfo._id
            }
            res.status(200).json(obj);
        });
    } catch(err) {
        res.status(401).json({ message: "Unauthorized." });
    }
}