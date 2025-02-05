import product from "../model/product.js"
import user from "../model/user.js"
import bcrypt from "bcryptjs"

export const getAllProducts = async(req,res) => {
    try {
     const allProducts = await product.find({})
     return res.status(200).json({allProducts, nbHits: allProducts.length})
    } catch (error) {
        console.log(error)
    }
   
}

export const getPopularInWomen = async(req,res) =>{
    try {
     const popularInWomen = await product.find({ category: 'women' }).sort( { rating : -1}).limit(4)
     return res.status(200).json({popularInWomen, nbHits:popularInWomen.length})  
    } catch (error) {
        console.log(error)
    }
}

export const getNewCollection = async(req,res) => {
    try {
        const newCollections = await product.find({}).sort({ createdAt: -1 }).limit(8)
        return res.status(200).json({newCollections, nbHits:newCollections.length})  
        
    } catch (error) {
        
    }
}

export const getAllProductsFiltered = async(req,res) =>{

    const { category } = req.query;
    const queryObj = {}
    if(category){
        queryObj.category = category
    }

    try {

       const filteredProduct =  await product.find(queryObj).limit(12)
       return res.status(200).json({filteredProduct, nbHits:filteredProduct.length}) 

    } catch (error) {
        console.log(error)
    }

}

export const signup = async(req, res) =>{

    const { username, email, password} = req.body;

    if(!username.length || !username.trim() ){
        return res.status(403).json({message:"Username must be provided"})
    }

    if(username.length < 3 || username.length > 20){
        return res.status(403).json({message:"Username must be at least 3 characters long and cannot exceed 20 characters"})
    }

    if(!email.length){
        return res.status(403).json({message:"Email must be provided"})
    }
    
    if(!password.length || password.length < 8 || !password.trim() ){
        return res.status(403).json({message:"Password must be provided and must be atleast 8 characters"})
    }
    if(password.length > 20){
        return res.status(403).json({message:"Password is too long"})
    }

    const hashed_password = await bcrypt.hash(password, 10)
    

    try {
        const newUser = await user.create({ username, email, password: hashed_password })

        return res.status(200).json(newUser)
        
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
}

export const login = ()=>{

}