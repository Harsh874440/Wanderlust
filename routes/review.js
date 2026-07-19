const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Review=require("../models/review.js")
const Listing=require("../models/listing.js");
const {isLoggedIn} =require("../middleware.js");
const {saveRedirectUrl} =require("../middleware.js");
const {isUser} =require("../middleware.js");
const {isAuthor} =require("../middleware.js");
const listingControllers =require("../controlle/review.js");



router.post("/:id/reviews",isLoggedIn , wrapAsync (listingControllers.postReview)
);

router.delete("/:id/reviews/:reviewid" ,isAuthor , wrapAsync(listingControllers.reviewDelete))
module.exports=router;

