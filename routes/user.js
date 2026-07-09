const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const User =require("../models/user.js");


router.get("/signup",async(req,res)=>{
    res.render("signup.ejs");
})

router.post("/signup", wrapAsync(async(req,res)=>{

    try{
let {username ,email ,password } =req.body;
   let newUser= new User({username,email});
    await User.register(newUser,password);
    console.log(newUser);
       req.flash("success","new User registered");
    res.redirect("listings");
    }
    catch(err){
        req.flash("error", "similar user exist");
        res.redirect("/signup");
    }
    
})
);


module.exports=router;