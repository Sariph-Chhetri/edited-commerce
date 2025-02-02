import product from "../model/product.js"

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