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
const  listing   =require("./routes/listing.js")
const review =require("./routes/review.js");
const session=require("express-session");
const flash =require("connect-flash");
const passport=require("passport");
const LocalStatergy =require("passport-local").Strategy;
const User =require("./models/user.js");
const user =require("./routes/user.js");




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

const sessionOption ={
   secret:"mysecret",
   resave:false,
   saveUninitialized:true,
   cookie:{
      expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge:7 * 24 * 60 * 60 * 1000,
      httpOnly:true,
   }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*app.get("/demoUser" ,async(req,res)=>{
  let fackUser =  new User({
   email:"abc@gmail.com",
   username:"Harsh",*/

  //});
  /*let registeredUser= await User.register(fackUser,"helloworld");
  res.send(registeredUser); 
})*/

app.use((req,res,next)=>{
   res.locals.success=req.flash("success");
   res.locals.error=req.flash("error");
   next();
})

app.use("/listings",listing);
app.use("/listings",review);
app.use("/",user);



   


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

 