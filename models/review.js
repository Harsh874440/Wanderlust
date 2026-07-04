const mongoose=require("mongoose");
const Schema = mongoose.Schema;
async function main(){
       await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 
 }  
  
 
  main().then((res)=>{
     console.log("connected mogoose");
  })
  .catch((err)=>{
     console.log(err);
  })


  const reviweSchema= new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
   created_at:{
    type:Date,
    default:Date.now(),
   }
  })


  const Review=mongoose.model("Review",reviweSchema);


  module.exports=Review;