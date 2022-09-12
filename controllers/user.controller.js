const { isAdmin } = require("../middleware/auth.jwt");
const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter")


exports.findAll = async (req, res) => {

    const queryObj = {};

    const userTypeQP = req.query.userType;
    const userStatusQP = req.query.userStatus;

    if (userTypeQP) {
        queryObj.userType = userTypeQP;
    }
    if (userStatusQP) {
        queryObj.userStatus = userStatusQP;
    }


    try {
        const users = await User.find(queryObj);
        res.status(500).send(objectConverter.userResponse(users))
    } catch (err) {
        console.log("Error while fetching all the users");
        res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.findByUserId = async (req, res) => {

    try {
        const user = await User.find({ userId: req.params.id });
        // user validation would have happened in the middleware itself
        return res.status(200).send(objectConverter.userResponse(user));

    } catch (err) {
        console.log("Error while searching the user ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


exports.update = async (req, res) => {

    try {
        const user = await User.findOne({ userId: req.params.id });

            user.userStatus = req.body.userStatus ? req.body.userStatus : user.userStatus;
            user.userType = req.body.userType ? req.body.userType : user.userType;
        
        user.name = req.body.name ? req.body.name : user.name;
        const updatedUser = await user.save();



        return res.status(200).send({
            name: updatedUser.name,
            userid: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus,
        });

    } catch (err) {
        console.log("Error while searching the user ", err);
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}