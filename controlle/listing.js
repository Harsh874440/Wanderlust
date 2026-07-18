const Listing=require("../models/listing.js");

//index route

module.exports.index=async (req,res)=>{
    let allListing=await Listing.find({});
   res.render("root.ejs",{allListing});
}

//new route

module.exports.neeFormLoad =async (req,res)=>{
res.render("new.ejs");
}

module.exports.newListingPost = async (req,res,next)=>{

   
let {title,description,image,price,location,country} =req.body;
    const newListing = await new Listing({title,description,image,price,location,country});
    newListing.owner=req.user._id;
   await newListing.save();
   req.flash("success","New listing addedd");
 res.redirect("/listings");
   
   
}
//show route
module.exports.showListing=async (req, res) => {
  let {id}=req.params;
  let listing= await Listing.findById(id).populate({path:"reviews" ,populate:{path:"author"}} ).populate("owner");
  if(!listing){
    req.flash("error" , "No such listing exist");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("show.ejs",{listing});
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findById(id);
   if(!listing){
    req.flash("error" , "No such listing exist");
    res.redirect("/listinngs");
  }
   res.render("edit.ejs",{listing});
}

module.exports.editPatch=async (req,res)=>{

  
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
   
   }

   module.exports.delete=async(req,res)=>{
      let {id} =req.params;
     let deleted= await Listing.findByIdAndDelete(id);
     console.log(deleted);
      req.flash("success","listing deleted");
     res.redirect("/listings");
   }