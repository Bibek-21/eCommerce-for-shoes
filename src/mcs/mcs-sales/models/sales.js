const mongoose = require('mongoose');



const salesSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },

    amount : Number,
    merchantEmail : String,
    merchantName : String,
    merchantMobile : String,
    type : String,
    user : String,

    active: {
        type : boolean,
        default : true

    },

    modifiedOn : {

        type: Date,
        default: Date.now()
    }


},{
    timestamps:true
});

module.exports = mongoose.model("sales",salesSchema)