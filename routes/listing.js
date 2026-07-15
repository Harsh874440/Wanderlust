const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn} =require("../middleware.js");
const {saveRedirectUrl} =require("../middleware.js");
const {isUser} =require("../middleware.js");
const { populate } = require("../models/user.js");
//index rout
router.get("/",wrapAsync (  async (req,res)=>{
    let allListing=await Listing.find({});
   res.render("root.ejs",{allListing});
})
);

router.get("/new", isLoggedIn ,wrapAsync ( async (req,res)=>{

res.render("new.ejs");


   
})
);

router.get("/:id",wrapAsync (  async (req, res) => {
  let {id}=req.params;
  let listing= await Listing.findById(id).populate({path:"reviews" ,populate:{path:"author"}} ).populate("owner");
  if(!listing){
    req.flash("error" , "No such listing exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("show.ejs",{listing});
})
);

router.post("/", isLoggedIn ,wrapAsync ( async (req,res,next)=>{

   
let {title,description,image,price,location,country} =req.body;
    const newListing = await new Listing({title,description,image,price,location,country});
    newListing.owner=req.user._id;
   await newListing.save();
   req.flash("success","New listing addedd");
 res.redirect("/listings");
   
   
})
);

router.get("/:id/edit",  isLoggedIn ,isUser, wrapAsync ( async (req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findById(id);
   if(!listing){
    req.flash("error" , "No such listing exist");
    res.redirect("/listinngs");
  }
   res.render("edit.ejs",{listing});
})
);

router.patch("/:id",isUser, isLoggedIn , wrapAsync ( async (req,res)=>{

  
  let {id}=req.params;
   let {
        title,
        description,
        image,
        price,
        location,
        country
    } = req.body;

    console.log(req.body.image);
   
     await Listing.findByIdAndUpdate(id,{
        title,
        description,
        image:{
            filename:"listingimage",
            url:image
        },
        price,
        location,
        country
    });
     req.flash("success","listing updated");
   res.redirect("/listings");
   
   })
);

   

router.delete("/:id", isLoggedIn ,isUser,  wrapAsync ( async(req,res)=>{
   let {id} =req.params;
  let deleted= await Listing.findByIdAndDelete(id);
  console.log(deleted);
   req.flash("success","listing deleted");
  res.redirect("/listings");
})
);

module.exports=router;