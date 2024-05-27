import express from "express";
import { createProducts , getAllProducts, getProductsById , updateProducts , updateFavorite , deleteProducts } from "../../src/api/v1/controllers/productsController.js";
import verifyToken from "../../middlewares/verifyToken.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductsById);
router.post("/products",createProducts);
router.put("/products/:id", verifyToken ,updateProducts);
router.patch("/products/:id/favorite", verifyToken , updateFavorite)
router.delete("/products/:id", verifyToken ,deleteProducts);


export default router;
