import express from "express"
import {getAllProducts, getAllProductsFiltered, getPopularInWomen, getNewCollection} from "../controller/route.js"
const router = express();

router.route("/products").get(getAllProducts)
router.route("/popular").get(getPopularInWomen)
router.route("/new").get(getNewCollection)
router.route("/filter").get(getAllProductsFiltered)

export default router;