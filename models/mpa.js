const res = require('express/lib/response')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const modelShema = mongoose.Schema(
    {
        ID : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        COMPANY : {
            type : String,
            required : true
        }
    },
    {
        timestamps : true
    }
)
modelShema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash;
        next();
    }
    catch(err){
        next(err)
    }
})
modelShema.methods.comparePassword = function(isInputPassword, cb){
    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {
        if(err) return cb(null, err)
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('mpa', modelShema)