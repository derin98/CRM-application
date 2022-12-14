const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema=mongoose.Schema({

    title :{
        type:String,
        required:true
    },
    ticketPriority:{
        type:Number,
        required:true,
        default:4
    },
    description :{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:constants.ticketStatuses.open,
        enum:[constants.ticketStatuses.open,constants.ticketStatuses.close,constants.ticketStatuses.blocked]
    },
    reporter:{
        type:String,
        required:true
    },
    assignee:{
        type:String
    },
    createdAt:{
        type:Date,
        default:()=>{return Date.now()},
        immutable:true    
    },
    updatedAt:{
        type:Date,
        default:()=>{return Date.now()}
    }

},

{versionKey:false})


module.exports=mongoose.model("Ticket",ticketSchema)