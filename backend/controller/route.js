import product from "../model/product.js";
import user from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await product.find({});
    return res.status(200).json({ allProducts, nbHits: allProducts.length });
  } catch (error) {
    console.log(error);
  }
};

export const getPopularInWomen = async (req, res) => {
  try {
    const popularInWomen = await product
      .find({ category: "women" })
      .sort({ rating: -1 })
      .limit(4);
    return res
      .status(200)
      .json({ popularInWomen, nbHits: popularInWomen.length });
  } catch (error) {
    console.log(error);
  }
};

export const getNewCollection = async (req, res) => {
  try {
    const newCollections = await product
      .find({})
      .sort({ createdAt: -1 })
      .limit(8);
    return res
      .status(200)
      .json({ newCollections, nbHits: newCollections.length });
  } catch (error) {}
};

export const getAllProductsFiltered = async (req, res) => {
  const { sortby, category } = req.query;
  let queryObj = {};
  if (category) {
    queryObj = {category : category}
  }

  let sortObj = {};

  if(sortby ==="high_to_low"){
    sortObj = {new_price: -1}
  }
  
  if(sortby ==="low_to_high"){
    sortObj = {new_price : 1}
  }

  try {
    const filteredProduct = await product.find(queryObj).sort(sortObj).limit(12);
    return res
      .status(200)
      .json({ filteredProduct, nbHits: filteredProduct.length });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !username.trim()) {
    return res.status(403).json({ message: "Username must be provided" });
  }

  if (username.length < 3 || username.length > 20) {
    return res.status(403).json({
      message:
        "Username must be at least 3 characters long and cannot exceed 20 characters",
    });
  }

  if (!email.length) {
    return res.status(403).json({ message: "Email must be provided" });
  }

  if (!password.length || password.length < 8 || !password.trim()) {
    return res.status(403).json({
      message: "Password must be provided and must be atleast 8 characters",
    });
  }

  if (password.length > 20) {
    return res.status(403).json({ message: "Password is too long" });
  }

  const userExists = await user.exists({username})
  const emailExists = await user.exists({email})

  if(userExists){
    return res.status(400).json({message:"Username already taken"})
  }
  if(emailExists){
    return res.status(400).json({message:"Email already taken"})
  }

  const hashed_password = await bcrypt.hash(password, 10);

  try {
    const newUser = await user.create({
      username,
      email,
      password: hashed_password,
    });

    return res
      .status(200)
      .json({ newUser, message: "New user created successfully" });
  } 
  catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Some error occured, please try again later!",
    });
  }
};

export const login = async(req, res) => {
  const { username, password } = req.body;

  if (!username || !username.trim()) {
    return res.status(403).json({ message: "Username must be provided" });
  }
  if (!password.length || password.length < 8 || !password.trim()) {
    return res.status(403).json({
      message: "Password must be provided and must be atleast 8 characters",
    });
  }

  await user
    .findOne({ username })
    .then(async(User) => {

      if(!User){
        return res.status(404).json({message:"Invalid Credentials"})
      }
      const passwordCorrect = await bcrypt.compare(password, User.password);

      if (!passwordCorrect) {
        return res.status(404).json({ message: "Invalid Credentials!" });
      }

      const token = jwt.sign({ id: User._id }, process.env.SECRET_Key); // this will create a jwt token and secret key can be used to decode the token

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS)
        sameSite: "Lax",
        maxAge: 3600000, // 1 hour
      });

      res.status(200).json({ message: "Logged in successfully!", User });
    })
    .catch((error) => {
      res.status(500).json({ message: "Login failed", error:error.message });
    });
};

export const logout = async ( req, res) =>{
  res.clearCookie("authToken")
  res.status(200).json({ message: "Logged out successfully" });
}

export const updateCart = async (req, res) => {
  const { userId, itemID, quantity } = req.body;

  try {
    // Find the user by ID
    const User = await user.findById(userId);

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the cart  
  
    const cartItem = User.cart.find(item => item.productId.toString() === itemID);
  
    if (cartItem) {
      // Update quantity if the product is already in the cart
      cartItem.quantity += quantity;
    } else {
      // Add new product to the cart
      User.cart.push({ productId: itemID, quantity });
    }

    // Save the updated user
    await User.save();

    // Send the updated cart as a response
    res.status(200).json({ message: "Cart updated successfully", cart: User.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removefromcart = async (req, res)=>{

const { userId, itemID} = req.body;

try {
 const User = await user.findById(userId)
 if (!User) {
  return res.status(404).json({ message: "User not found" });
}

// Check if the product already exists in the cart  

const cartItem = User.cart.find(item => item.productId.toString() === itemID);
if (!cartItem) {
  return res.status(404).json({ message: "Product not found in cart" });
}

 if(cartItem.quantity > 1){
  cartItem.quantity -= 1;
 
} else {
  User.cart = User.cart.filter((item) => item.productId.toString() != itemID )
}

// Save the updated user
await User.save();
res.status(200).json({ message: "Cart removed successfully", cart: User.cart });
  
} catch (error) {
  console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error", error: error.message });
}
  
}
