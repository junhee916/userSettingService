const mpaModel = require('../models/mpa')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const mpaController = {}
mpaController.getDetailUser = async (req, res) => {
    const id = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findById(id)
            if(!user){
                return res.status(403).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get user",
                    userData : user
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.getUser = async (req, res) => {
    try{
        if(res.locals.user){
            // 사용자가 등록한 기관을 확인하고 불러온다.
            const users = await userModel.find({COMPANY : res.locals.user.COMPANY})
            res.status(200).json({
                msg : "get users",
                count : users.length,
                usersData : users
            })
        }
        else{
            res.status(402).json({
                msg : 'no token'
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.getCOMPANY = async (req, res) => {
    try{
        if(res.locals.user){
            const mpa = await mpaModel.findById({_id:res.locals.user.id})
            if(!mpa){
                return res.status(403).json({
                    msg : "no mpaId"
                })
            }
            else{
                res.status(200).json({
                    msg : "get mpa",
                    mpaData : mpa
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.signup = async (req, res) => {
    const {ID, password, COMPANY} = req.body
    try{
        const mpa = await mpaModel.findOne({ID})
        if(mpa){
            return res.status(400).json({
                msg : "user ID, please other ID"
            })
        }
        else{
            const mpa = new mpaModel({
                ID, password, COMPANY
            })
            await mpa.save()
            res.status(200).json({
                msg : "success MPA signup",
                mpaData : mpa
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.login = async (req, res) => {
    const {ID, password} = req.body
    try{
        const mpa = await mpaModel.findOne({ID})
        if(!mpa){
            return res.status(400).json({
                msg : "user ID, please other ID"
            })
        }
        else{
            await mpa.comparePassword(password, (err, isMatch) => {
                if(err || !isMatch){
                    return res.status(401).json({
                        msg : "not match password"
                    })
                }
                else{
                    const payload = {
                        id : mpa["_id"],
                        ID : mpa["ID"],
                        COMPANY : mpa["COMPANY"]
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
                        mpaData : mpa
                    })
                }
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.updateUser = async (req, res) => {
    const id = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findByIdAndUpdate(id, {$set: {
                        MPA : "Y"
                    }})
            if(!user){
                return res.status(403).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update user by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};
mpaController.deleteUser = async (req, res) => {
    const id = req.params.userId
    try{
        if(res.locals.user){
            const user = await userModel.findByIdAndUpdate(id, {$set: {
                        MPA : "N"
                    }})
            if(!user){
                return res.status(403).json({
                    msg : "no userId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update user by id: " + id
                })
            }
        }
        else{
            res.status(402).json({
                msg : "no token"
            })
        }
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
};

module.exports = mpaController