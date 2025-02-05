import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    
        username: {
            type: String,
            required: [true, "Username is required"], // Custom error message
            minlength: [3, "Username must be at least 3 characters long"],
            maxlength: [20, "Username cannot exceed 20 characters"],
            trim: true,
            unique: true,
          },
      email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      cart: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ]
})

export default mongoose.model("User", userSchema)