import Express from "express";
const router=Express.Router();

router.post("/displayfood",(req,res)=>{
    try{
        if (!global.food_products || !global.food_category) {
            return res.status(500).send("Data not available");
        }
        const data=[global.food_products,global.food_category];
        res.send(data);
    }catch(err){
        console.err(err.message);
        res.send("server error");
    }
});

export default router;
