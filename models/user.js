const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;

async function main(){
       await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 
 }  
  
 
  main().then((res)=>{
     console.log("connected mogoose");
  })
  .catch((err)=>{
     console.log(err);
  })


const userSchema= new Schema({
    email:{
        type:String,
        required:true,
    }
})



userSchema.plugin(passportLocalMongoose);
const User=mongoose.model("User",userSchema);

module.exports=User;