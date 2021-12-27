const boardModel = require('../models/board')
const boardController = {}
boardController.allGet = async (req, res) => {
    try{
        if(res.locals.user){
            const boards = await boardModel.find()
            res.status(200).json({
                msg : "get boards",
                boardsData : boards
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
boardController.detailGet = async(req, res) => {
    try{
        if(res.locals.user){
            boardModel.aggregate([
                {$match : {_id : Number(req.params.boardId)}},
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
                        boardData : result,
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
boardController.save = async (req, res) => {
    const {board} = req.body
    const newBoard = new boardModel({
        user : res.locals.user.ID,
        board : board
    })
    try{
        if(res.locals.user){
            const board = await newBoard.save()
            res.status(200).json({
                msg : "save board",
                boardInfo : board
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
boardController.update = async (req, res) => {
    const id = req.params.boardId
    try{    
        if(res.locals.user){
            const board = await boardModel.findByIdAndUpdate(id, {$set : {
                                board : req.body.board
                            }})
            if(!board){
                return res.status(403).json({
                    msg : "no boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "update board by id: " + id
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
boardController.delete = async (req, res) => {
    const id = req.params.boardId
    try{
        if(res.locals.user){
            const board = await boardModel.findByIdAndRemove(id)
            if(!board){
                return res.status(403).json({
                    msg : "no boardId"
                })
            }
            else{
                res.status(200).json({
                    msg : "delete board by id: " + id
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
module.exports = boardController