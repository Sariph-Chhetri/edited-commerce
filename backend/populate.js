import { configDotenv } from "dotenv";
import connectDb from "./config/dbConnect.js";
import JsonProducts from "./product.js"
import product from "./model/product.js";


configDotenv();
connectDb(process.env.DB_LOCATION);

const create = async () =>{
    try{
        await product.deleteMany();
        await product.create(JsonProducts)
    }
    catch(err){
      console.log(err)
    }
   
}
create()