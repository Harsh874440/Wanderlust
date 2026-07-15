const  listing   =require("./routes/listing.js");
const Listing=require("./models/listing.js");
const Review=require("./models/review.js")

module.exports.isLoggedIn =(req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
  req.flash("error","you are not looged in ");
 return  res.redirect("/login");
}
next();



}


module.exports.saveRedirectUrl= (req,res,next)=>{
    res.locals.redirectUrl=req.session.redirectUrl;
    next()
}

module.exports.isUser = async (req,res,next)=>{
    let {id}=req.params;
    let listing = await  Listing.findById(id);
   if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you are not the user");
    return  res.redirect("/listings");
   }
   next();
}

module.exports.isAuthor = async (req,res,next)=>{
    let {id,reviewid}=req.params;
    let review = await  Review.findById(reviewid);
   if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","you are not the author");
    return  res.redirect("/listings");
   }
   next();
}