const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{ 
        type:String,
        required:true,
        unique:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>{return Date.now()},
        immutable:true    
    },
    updatedAt:{
        type:Date,
        default:()=>{return Date.now()}
    },
    userStatus:{
        type:String,
        required:true,
        default:constants.userStatus.apporved,
        enum:[constants.userStatus.apporved,constants.userStatus.pending,constants.userStatus.rejected]
    },
    userType:{
        type:String,
        required:true,
        default:constants.userTypes.customer,
        enum:[constants.userTypes.customer,constants.userTypes.admin,constants.userTypes.engineer]
    },
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    },
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }

})

module.exports = mongoose.model("user",userSchema);