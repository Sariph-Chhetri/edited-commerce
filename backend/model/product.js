import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name must be provided"]
    },
    category:{
        type: String,
        enum:{
            values :['men', 'women', 'kids']
        }
    },
    image:{
        type: String,
        default: "https://picsum.photos/300"
    },
    new_price:{
        type: Number,
        required: [true,"Price must be provided"]
    },
    old_price:{
        type: Number
    },
    new_price:{
        type: Number
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    rating:{
        type: Number
    },
})

export default mongoose.model("Product", productSchema);