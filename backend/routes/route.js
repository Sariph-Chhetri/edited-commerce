import express from "express"
import {getAllProducts, getAllProductsFiltered, getPopularInWomen, getNewCollection, signup, login} from "../controller/route.js"
const router = express();

router.route("/products").get(getAllProducts)
router.route("/popular").get(getPopularInWomen)
router.route("/new").get(getNewCollection)
router.route("/filter").get(getAllProductsFiltered)
router.route("/signup").post(signup)
router.route("/login").post(login)

export default router;