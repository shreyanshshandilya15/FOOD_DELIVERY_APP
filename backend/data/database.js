import mongoose from "mongoose";

console.log(process.env.MONGO_URL);

export const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL,{
       dbName:"orderfoodmern",
    });
      console.log(`database connected with ${mongoose.connection.host}`);
    
      const fetched_data = await mongoose.connection.db.collection("food_products")
      .find({})
      .toArray();
      global.food_products=fetched_data;

      const category_data= await mongoose.connection.db.collection("food_category")
      .find({})
      .toArray();
      global.food_category=category_data;
}catch(err){
        console.log(err);
    }
};
