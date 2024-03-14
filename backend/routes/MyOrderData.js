import express from "express"
  const router=express.Router();
  import { Orders } from "../models/Orders.js";

  router.post("/myorderData",async(req,res)=>{
    try {
      let eId = await Orders.findOne({ "email": req.body.email })
      
      res.json({orderData:eId});
  } catch (error) {
    console.log(error);
      res.send("Error",error.message);
  }
  
  })

  export default router;