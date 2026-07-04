const express =require("express");
const app= express();
const mongoose=require("mongoose");
const port =8080;
const path =require("path");
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync=require("./utils/wrapAsybc.js");
const expressError=require("./utils/expressError.js");
const joi =require("joi");
const{Schema} =require("./schema.js")
const Review=require("./models/review.js")

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({expected:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


async function main(){
      await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}
 

 main().then((res)=>{
    console.log("connected mogoose");
 })
 .catch((err)=>{
    console.log(err);
 })
app.listen(port),()=>{
    console.log("server started");
}

app.get("/",(req,res)=>{
    res.send("hi i am root");
})

//index rout
app.get("/listings",wrapAsync (  async (req,res)=>{
    let allListing=await Listing.find({});
   res.render("root.ejs",{allListing});
})
);

app.get("/listings/new", wrapAsync ( async (req,res)=>{

res.render("new.ejs");
   
})
);

app.get("/listings/:id",wrapAsync (  async (req, res) => {
  let {id}=req.params;
  let listing= await Listing.findById(id).populate("reviews");
  console.log(listing);
  res.render("show.ejs",{listing});
})
);

app.post("/listings",wrapAsync ( async (req,res,next)=>{

   
let {title,description,image,price,location,country} =req.body;
    const newListing = await new Listing({title,description,image,price,location,country});
   await newListing.save();
 res.redirect("/listings");
   
   
})
);

app.get("/listings/:id/edit", wrapAsync ( async (req,res)=>{
    let {id}=req.params;
   let listing= await Listing.findById(id);
   res.render("edit.ejs",{listing});
})
);

app.patch("/listings/:id", wrapAsync ( async (req,res)=>{

  
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

   

app.delete("/listings/:id", wrapAsync ( async(req,res)=>{
   let {id} =req.params;
  let deleted= await Listing.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect("/listings");
})
);

app.post("/listings/:id/reviews", wrapAsync (async(req,res)=>{
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

app.delete("/listings/:id/reviews/:reviewid" , async(req,res)=>{
   let {id ,reviewid} =req.params;
   await Listing.findByIdAndUpdate(id, {$pull :{reviews:reviewid}})
   await Review.findByIdAndDelete(reviewid);

   res.redirect(`/listings/${id}`);
})

app.get("/random",(req,res,next)=>{
   next(new expressError(404,"page not found"));
})





app.use((err,req,res,next)=>{
   let{
      status=500,
      message,
   }=err;
res.render("error.ejs",{message,err});
})



/*app.get("/testListing", async (req,res)=>{
     let sampleListing =new Listing({
        title:"my villa",
        description:"by the beach",
        price:1222,
        location:"claanguate ,goa",
        country:"india",
     });

      await sampleListing.save();
      console.log("sample was saved ");
})*/

 