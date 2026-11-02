const mongoose = require("mongoose");

const entrySchema =  new mongoose.Schema({
    title:{
        type: String,
        required: true,
        max:100
    },
    entryBody:{
        type:String,
        max:350
    },
    isPublic:{
        type:Boolean,
        Default: null
    },
    owner:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }

},{timestamps:true})

const Entry = mongoose.model('Entry',entrySchema)

module.exports = Entry