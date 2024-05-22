const express=require('express');
const wrapAsync=require("../utils/wrapAsync.js");
const router=express.Router();
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage})


router.route("/")
    //index route
    .get(wrapAsync(listingController.index)) 
    // create route
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));//,validateListing,

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
    //show royte
    .get(wrapAsync(listingController.showListing))
    //update
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
    //delete
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
    

//edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
module.exports=router;