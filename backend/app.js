import express from "express"
import connectDb from "./config/dbConnect.js";
import { configDotenv } from "dotenv"; 
import router from "./routes/route.js";
import cors from "cors"
import cookieParser from "cookie-parser"

configDotenv();
const app = express();


app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)



app.listen(process.env.PORT, ()=>{
    connectDb(process.env.DB_LOCATION);
    console.log(`listening at port ${process.env.PORT}`)
})