const User = require("../models/User");

const auth = async (req, res, next) => {
    const token = req.get("Authentication");
    if (!token) {
        return res.status(401).send({error: "No token presented"});
    }

    const author = await User.findOne({token});
    if(!author) {
        return res.status(401).send({error: "Wrong token"});
    }

    req.author = author;
    next();
};

module.exports = auth;