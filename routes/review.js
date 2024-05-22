const express=require('express');
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} =require("../middleware.js");
const router=express.Router({mergeParams:true});
const reviewController=require("../controllers/review.js");

//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.craeteReview));
//delete review routr
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;