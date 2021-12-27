const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const userController = {}
userController.getMpa = async (req, res) => {
    const ID = req.params.userID
    try{
        const user = await userModel.findOne({ID})
        if(!user){
            res.status(403).json({
                msg : "no userID"
            })
        }
        else{
            res.status(200).json({
                msg : "get user in MPA",
                userData : user
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
userController.signup = async (req, res) => {
    const {NAME, COMPANY, EMAIL, ID, password} = req.body
    try{
        const user = await userModel.findOne({ID})
        if(user){
            return res.status(400).json({
                msg : "user ID, please other ID"
            })
        }
        else{
            const user = new userModel({
                NAME, COMPANY, EMAIL, ID, password,
                MPA : "W"
            })
            await user.save()
            res.status(200).json({
                msg : "success signup",
                userData : user
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
userController.login = async (req, res) => {
    const {ID, password} = req.body
    try{
        const user = await userModel.findOne({ID})
        if(!user){
            return res.status(400).json({
                msg : "user ID, please other ID"
            })
        }
        else{
            const payload = {
                id : user["_id"],
                ID : user["ID"]
            }
            const token = jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn : '1h'
                }
            )
            res.status(200).json({
                msg : "success login",
                token : token,
                userData : user
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

module.exports = userController