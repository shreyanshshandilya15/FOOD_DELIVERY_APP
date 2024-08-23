import Express  from "express";
import { User } from "../models/User.js";
const router=Express.Router();
import {body,validationResult} from 'express-validator';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.post("/createuser",
   [
    body('name',"Usrename must be greater than 5").isLength({min:5}),
    body('password',"Usrename must be greater than 5").isLength({min:5}),
    body('email').isEmail()
   ]
,async(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
        
    }
    const {name,email,password,location}=req.body;
   
    const hashedPassword=await bcrypt.hash(password,10);
    try{
        await User.create({
            name,
            email,
            password:hashedPassword,
            location
        }
        )
        res.json({success:true});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
});

router.post("/loginuser",
   [
    body('password',"Usrename must be greater than 5").isLength({min:5}),
    body('email').isEmail()
   ]
,async(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
         return res.status(400).json({ errors: result.array() });
        
     }
     const {email,password}=req.body;
    try{
       
        const userdata=await User.findOne({email});
        
        if(!userdata){
            return res.status(400).json({ errors:" try putting the correct credentials" });
        }

        const isMatch=await bcrypt.compare(password,userdata.password);
        if(!isMatch){
            return res.status(400).json({ errors: "try putting the correct credentials"});
        }
        
        const data={
            user:{
                _id:userdata._id
            }
        }
        const token=jwt.sign(data,process.env.JWT_SECRET);
        return res.json({success:true,token:token});
    }catch(error){
        console.log(error);
        res.json({success:false});
    }
});

export default router;
