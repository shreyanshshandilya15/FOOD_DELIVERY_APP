import Express from "express";
const router=Express.Router();
import global from "@vitejs/plugin-react-swc";

router.post("/displayfood",(req,res)=>{
    try{
        // console.log(global.food_products);
        const data=[global.food_products,global.food_category];
        res.send(data);
    }catch(err){
        console.err(err.message);
        res.send("server error");
    }
});

export default router;
