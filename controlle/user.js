const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const User =require("../models/user.js");


module.exports.signup=async(req,res)=>{

    try{
let {username ,email ,password } =req.body;
   let newUser= new User({username,email});
    await User.register(newUser,password);
    console.log(newUser);
    req.login(newUser,(err)=>{
        if(err){
        return    next(err);
        }
        req.flash("success","new User registered");
    res.redirect("listings");
    })
       
    }
    catch(err){
        req.flash("error", "similar user exist");
        res.redirect("/signup");
    }
    
}

module.exports.renderSignup=async(req,res)=>{
    res.render("signup.ejs");
}

module.exports.renderLogin=async(req,res)=>{
    res.render("login.ejs");
}

module.exports.login=async (req,res)=>{
        req.flash("success","you are logged in ");
        let redirectUrl =res.locals.redirectUrl || "/listings" ;
     res.redirect(redirectUrl);
    }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){ return next();};
       req.flash("success","you are logged out");
       res.redirect("/listings");
    })

}    