import mongoose from "mongoose"

const OrderSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

export const Orders= mongoose.model("Orders",OrderSchema);