import express from "express";
import {connectDB} from "./data/database.js";
import UserRoutes from "./routes/CreateUser.js"; 
import DisplayData from "./routes/DisplayData.js";
import OrderData from "./routes/OrderData.js";
import MyOrderData from "./routes/MyOrderData.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

//resolving dirname for ES module
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//use the client app
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client/dist/index.html"));
});

dotenv.config({ path: './.env' });

const app=express();
connectDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api/v1",UserRoutes);
app.use("/api/v1",DisplayData);
app.use("/api/v1",OrderData);
app.use("/api/v1",MyOrderData);

app.get("/",(req,res)=>{
    res.send("hello world");
});

const port=process.env.PORT || 4000;
const host = '0.0.0.0';
app.listen(port,host,()=>{
    console.log(`server is running on http://${host}:${port} successfully !!`);
});

