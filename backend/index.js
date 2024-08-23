import express from "express";
import {connectDB} from "./data/database.js";
import UserRoutes from "./routes/CreateUser.js"; 
import DisplayData from "./routes/DisplayData.js";
import OrderData from "./routes/OrderData.js";
import MyOrderData from "./routes/MyOrderData.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: './.env' });

const app=express();

//resolving dirname for ES module
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//use the client app
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client/dist/index.html"));
});

connectDB();
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://food-delivery-app-byh4.onrender.com/' // Your deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authorization headers if needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1",UserRoutes);
app.use("/api/v1",DisplayData);
app.use("/api/v1",OrderData);
app.use("/api/v1",MyOrderData);

app.get("/",(req,res)=>{
    res.send("hello world");
});

const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server is running on port ${port} successfully !!`);
});

