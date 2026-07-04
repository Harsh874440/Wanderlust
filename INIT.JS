    const mongoose=require("mongoose");
    const Listing=require("./models/listing.js");
    const data =require("./data.js");

    async function main(){
          await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
    
    }
     
    
     main().then((res)=>{
        console.log("connected mogoose");
     })
     .catch((err)=>{
        console.log(err);
     })

     const initDb=  async () =>{
      await  Listing.deleteMany({});
      await Listing.insertMany(data.data);
      console.log("data was initilised ");
     }


     initDb();
