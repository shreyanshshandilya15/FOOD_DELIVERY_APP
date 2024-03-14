  import express from "express"
  const router=express.Router();
  import { Orders } from "../models/Orders.js";

  router.post("/orderData",async(req,res)=>{
        let data=req.body.order_data;
        await data.splice(0,0,{order_date:req.body.order_date});
        
        let Eid=await Orders.findOne({"email":req.body.email});
        // console.log(Eid);
        //when it is the users first order
        if(Eid==null){
            try{
                await Orders.create({
                    email:req.body.email,
                    order_data:[data]
                   }).then(()=>{
                    res.json({success:true});
                   })
            }catch(err){
                console.log(err);
                
            }     
        }
        else{
            try{
               await Orders.findOneAndUpdate({email:req.body.email},
               {$push:{order_data:data}}
               ).then(()=>{
                res.json({success:true});
               })
            }catch(err){
            
               console.log(err);
            }
        }
  }) 
  
  export default router;