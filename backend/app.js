import express from "express"
import connectDb from "./config/dbConnect.js";
import { configDotenv } from "dotenv"; 
import router from "./routes/route.js";
import cors from "cors"
import cookieParser from "cookie-parser"

configDotenv();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Set to your frontend URL
    credentials: true, // Allow sending cookies with requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // Specify allowed headers
  }));
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)



app.listen(process.env.PORT, ()=>{
    connectDb(process.env.DB_LOCATION);
    console.log(`listening at port ${process.env.PORT}`)
})