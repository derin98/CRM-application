const User = require("../models/user.model");
const constants = require("../utils/constants");

const isValidEmail = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validateSignUpRequest = async (req,res,next)=>{

    const pass = req.body.password;

    
    const userTypes=[constants.userTypes.customer,constants.userTypes.engineer];

    if (!req.body.name){
        return res.status(400).send({
            message:"Name not provided"
        })
    }

    if (!req.body.userId){
        return res.status(400).send({
            message:"UserId not provided"
        })
    }

    try{
        const user = await User.findOne({userId:req.body.userId});
        if(user!=null){
           return res.status(500).send({
                message : "UserId already taken"
            });
        }

    }catch(err){
        res.status(500).send({
        message : "Some internal server error occoured while validating request"
    });}

    if (!pass){
        return res.status(400).send({
            message:"Password not provided"
        })
    }

    if (pass.length<10){
        return res.status(500).send({
            message:"Password should have atleast 10 characters"
        })
    }

    if (!req.body.email){
        return res.status(400).send({
            message:"e-mail not provided"
        })
    }

    if (!isValidEmail(req.body.email)){
        return res.status(400).send({
            message:"Not a valid e-mail"
        })
    }

    if (req.body.userType==constants.userTypes.admin){
        return res.status(400).send({
            message:"ADMIN registration is not allowed"
        })
    }
  
    if (!req.body.userType){
        return res.status(400).send({
            message:"User type is not passed"
        })
    }

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message:"User type provided is not correct. Possible values : CUSTOMER | ENGINEER"
        })
    }



    next()



}




const validateSignInRequest = async (req,res,next)=>{

    const pass = req.body.password;

    if (!req.body.userId){
        return res.status(400).send({
            message:"UserId not provided"
        })
    }

    if (!pass){
        return res.status(400).send({
            message:"Password not provided"
        })
    }

    next();

}

const verifyRequestBodyForAuth = {validateSignUpRequest,validateSignInRequest}

module.exports=verifyRequestBodyForAuth;