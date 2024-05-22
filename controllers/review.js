const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.craeteReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    console.log(newReview);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("sucess","New Review Created");
    res.redirect(`/listings/${listing._id}`);
    // res.send("new response saved");
};
module.exports.destroyReview=async(req,res)=>{{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("sucess","Review Deleted !!!");
    res.redirect(`/listings/${id}`);
}};