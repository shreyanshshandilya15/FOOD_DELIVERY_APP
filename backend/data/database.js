import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL,{
       dbName:"orderfoodmern",
    });
      console.log(`connected with database ${mongoose.connection.host} succesfully`);
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
