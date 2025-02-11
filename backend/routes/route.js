import express from "express"
import {getAllProducts, getAllProductsFiltered, getPopularInWomen, getNewCollection, signup, login,logout, updateCart, removefromcart} from "../controller/route.js"
const router = express();

router.route("/products").get(getAllProducts)
router.route("/popular").get(getPopularInWomen)
router.route("/new").get(getNewCollection)
router.route("/filter").get(getAllProductsFiltered)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/removecart").post(removefromcart)
router.route("/updatecart").put(updateCart)

export default router;