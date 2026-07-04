const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Review=require("../models/review.js")
const Listing=require("../models/listing.js");



router.post("/:id/reviews", wrapAsync (async(req,res)=>{
  let {id} =req.params ;
  let {rating,comment} =req.body;
  const listing=  await Listing.findById(id);
  const newRev=new Review({comment,rating});
 listing.reviews.push(newRev);
   await newRev.save();
   await listing.save();
console.log(listing);
res.redirect("/listings");
})
);

router.delete("/:id/reviews/:reviewid" , async(req,res)=>{
   let {id ,reviewid} =req.params;
   console.log(id);
   await Listing.findByIdAndUpdate(id, {$pull :{reviews:reviewid}})
   await Review.findByIdAndDelete(reviewid);

   res.redirect(`/listings/${id}`);
})
module.exports=router;

