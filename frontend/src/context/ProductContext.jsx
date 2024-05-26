import { createContext, useEffect, useState } from "react";
import { productsGet } from "../components/services/productGet.js";
import { productGetById } from "../components/services/productGetById.js";
import { productDelete } from "../components/services/productDelete.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const getMyProducts = async () => {
    try {
      const response = await productsGet();
      setProducts(response.products.map((product) => ({ ...product })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await productGetById(id);
      setProduct(response.product);
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };


  const deleteProduct = async (productId , token) => {
    try {
      await productDelete(productId , token)
      getMyProducts()
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  useEffect(() => {
    getMyProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        setProducts,
        getMyProducts,
        getProductById,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
