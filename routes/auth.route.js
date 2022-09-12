

const authController = require("../controllers/auth.controller");
const {verifySignUp} = require("../middleware");


module.exports = (app)=>{

    app.post("/music/api/v1/auth/signup",[verifySignUp.validateSignUpRequest],authController.signup)

    app.post("/music/api/v1/auth/signin",[verifySignUp.validateSignInRequest],authController.signin)
}