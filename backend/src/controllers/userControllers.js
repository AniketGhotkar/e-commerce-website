// controllers/userController.js
const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        // Fetch all users where isAdmin is false
        const users = await User.find({ isAdmin: false }).select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getAllUsers, getUserInfo};
