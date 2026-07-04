const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
//index rout
router.get("/",wrapAsync (  async (req,res)=>{
    let allListing=await Listing.find({});
   res.render("root.ejs",{allListing});
})
);

router.get("/new", wrapAsync ( async (req,res)=>{

res.render("new.ejs");
   
})
);

router.get("/:id",wrapAsync (  async (req, res) => {
  let {id}=req.params;
  let listing= await Listing.findById(id).populate("reviews");
  console.log(listing);
  res.render("show.ejs",{listing});
})
);

router.post("/",wrapAsync ( async (req,res,next)=>{

   
let {title,description,image,price,location,country} =req.body;
    const newListing = await new Listing({title,description,image,price,location,country});
   await newListing.save();
 res.redirect("/listings");
   
   
})
);

router.get("/:id/edit", wrapAsync ( async (req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findById(id);
   res.render("edit.ejs",{listing});
})
);

router.patch("/:id", wrapAsync ( async (req,res)=>{

  
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
   res.redirect("/listings");
   
   })
);

   

router.delete("/:id", wrapAsync ( async(req,res)=>{
   let {id} =req.params;
  let deleted= await Listing.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect("/listings");
})
);

module.exports=router;