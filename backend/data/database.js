import mongoose from "mongoose";
import global from "@vitejs/plugin-react-swc";
const MONGO_URL="mongodb+srv://nodejskey:nodejskey@cluster0.hhop9mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export const connectDB=async()=>{
    try{
       await mongoose.connect(MONGO_URL,{
       dbName:"orderfoodmern",
    });
      console.log(`database connected with ${mongoose.connection.host}`);
      const fetched_data=await mongoose.connection.db.collection("food_products")
      .find({})
      .toArray();
       global.food_products=fetched_data;
      // console.log(fetched_data);
      const category_data=await mongoose.connection.db.collection("food_category")
      .find({})
      .toArray();
       global.food_category=category_data;
}catch(err){
        console.log(err);
    }
}




