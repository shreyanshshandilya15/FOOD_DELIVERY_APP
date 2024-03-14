import express from "express";
import {connectDB} from "./data/database.js";
import UserRoutes from "./routes/CreateUser.js"; 
import DisplayData from "./routes/DisplayData.js";
import OrderData from "./routes/OrderData.js";
import MyOrderData from "./routes/MyOrderData.js";
const port=4000;

const app=express();
connectDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
})

// app.use(
    
    
//   cors({
  
//       // origin:'*',
//       origin: function(origin, callback) {
//           // Allow requests from localhost:5173
//           if (!origin || origin === 'http://localhost:5173') {
//             callback(null, true);
//           } else {
//             callback(new Error('Not allowed by CORS'));
//           }
//         },
//       methods:["GET","POST","PUT","DELETE"],
//       credentials:true,
//   })
// );


app.use(express.json());
app.use("/api/v1",UserRoutes);
app.use("/api/v1",DisplayData);
app.use("/api/v1",OrderData);
app.use("/api/v1",MyOrderData);

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port} successfully !!`);
})
