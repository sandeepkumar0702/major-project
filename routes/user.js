const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require('passport');
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/user.js");

router.route("/signup")
    ///signnuip form
    .get(userController.renderSignupFrom)
    // cretee user
    .post(wrapAsync(userController.signup));
router.route("/login")
    //  login usere
    .get(userController.renderLoginForm)
    // aftere login
    .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);
//logout user
router.get("/logout",userController.logout);
module.exports=router;