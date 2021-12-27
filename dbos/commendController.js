const commendModel = require('../models/commend')
const commendController = {}
commendController.get = async (req, res) => {
    try{
        if(res.locals.user){
            commendModel.aggregate([
                {$match : {board : Number(req.params.boardId)}},
                {
                    $lookup:{
                        from : "users",
                        localField : "user",
                        foreignField : "ID",
                        as : "user_docs"
                    }
                }
            ], function(err, result){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        commendData : result,
                        userID : res.locals.user.ID
                    })
                }
            })
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
commendController.detailGet = (req, res) => {
    try{
        if(res.locals.user){
            commendModel.aggregate([
                {$match : {_id : Number(req.params.commendId)}},
                {
                    $lookup:{
                        from : "users",
                        localField : "user",
                        foreignField : "ID",
                        as : "user_docs"
                    }
                }
            ], function(err, result){
                if(err){
                    console.log(err)
                }
                else{
                    res.status(200).json({
                        commendData : result,
                        userID : res.locals.user.ID
                    })
                }
            })
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
commendController.save = async(req, res) => {
    const {board, commend} = req.body
    const newCommend = new commendModel({
        user : res.locals.user.ID,
        board, commend
    })
    try{
        if(res.locals.user){
            const commend = await newCommend.save()
            res.status(200).json({
                msg : "save commend",
                commendData : commend
            })
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
commendController.delete = async (req, res) => {
    const id = req.params.commendId
    try{
        if(res.locals.user){
            const commend = await commendModel.findByIdAndRemove(id)
            if(!commend){
                return res.status(403).json({
                    msg : "no commendId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete commend by id: " + id
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
module.exports = commendController