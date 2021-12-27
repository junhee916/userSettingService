const mongoose = require('mongoose')
const autoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcryptjs')
const modelSchema = mongoose.Schema(
    {
        _id : Number,
        NAME : {
            type : String
        },
        COMPANY : {
            type : String
        },
        EMAIL : {
            type : String,
            match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        ID : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        MPA : {
            type : String
        }
    },
    {
        timestamps : true
    }
)
modelSchema.plugin(autoIncrement, {id: 'user_id_counter', inc_field: '_id'})
modelSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash;
        next()
    }
    catch(err){
        next(err)
    }
})
modelSchema.methods.comparePassword = function(isInputPassword, cb){
    bcrypt.compare(isInputPassword, this.password, (err, isMatch) => {
        if(err) return cb(null, err)
        cb(null, isMatch)
    })
}
module.exports = mongoose.model('user', modelSchema)