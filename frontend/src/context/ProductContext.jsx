import { createContext, useEffect, useState } from "react";
import { productsGet } from "../components/services/productGet.js";
import { productGetById } from "../components/services/productGetById.js";

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
