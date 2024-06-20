import express from "express";
import {
  addtoCart,
  getAllCart,
  updateCartItem /* , getCartById */,
  deleteCart,
} from "../../src/api/v1/controllers/cartController.js";

const router = express.Router();

router.get("/cart/:idUser", getAllCart);
/* router.get("/products/:id", getCartById); */
router.post("/cart", addtoCart);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", deleteCart);

export default router;
