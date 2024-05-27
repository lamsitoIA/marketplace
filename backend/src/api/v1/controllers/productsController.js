import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  setFavorite
} from "../models/productModel.js";
import { findError } from "../utils/utils.js";

//get all products
export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await getAllProduct();
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

//get products by id 
export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await getProductById(id);
    res.status(200).json({ product: productDetails });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

//post products
export const createProducts = async (req, res) => {
  try {
    const { product } = req.body;
    const createdProduct = await createProduct(product);
    res.status(201).json({ newProduct: createdProduct });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};


//put product
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;
    const updatedProduct = await updateProduct(id, product);
    res.status(200).json({ updatedProduct: updatedProduct });
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

//patch favorite
export const updateFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { isFavorite } = req.body;
    console.log("Received PATCH request:", { id, isFavorite });
    const updatedProduct = await setFavorite(id, isFavorite);

    if (updatedProduct.rowCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Product updated successfully:", updatedProduct.rows[0]);
    res.status(200).json({ product: updatedProduct.rows[0] });
  } catch (error) {
    console.error("Error updating favorite status:", error);
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};

//delete product
export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProduct(id);

    if (deletedProduct === 0) {
      return res.status(404).json({ message: "The record does not exist" });
    }

    return res.status(204).json({ message: "Record deleted successfully" });
  } catch (error) {
    const errorFound = findError(error.code);
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message });
  }
};
