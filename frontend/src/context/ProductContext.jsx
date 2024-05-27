import { createContext, useEffect, useState } from "react";
import { productsGet } from "../components/services/productGet.js";
import { productGetById } from "../components/services/productGetById.js";
import { productDelete } from "../components/services/productDelete.js";
import { productFavorite } from "../components/services/productFavorite.js";

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

  const addFavorite = async (id, isFavorite , token) => {
    try {
      const newProducts = products.map((product) => {
        if (product.id_product === id) {
          const updatedProduct = {
            ...product,
            isFavorite: !product.isFavorite,
          };
  
          // Llamada a la API para actualizar el estado de "favorito" en la base de datos
          productFavorite(id, updatedProduct.isFavorite, token);
  
          return updatedProduct;
        }
        return product;
      });
  
      setProducts(newProducts);
    } catch (error) {
      console.error("Error updating favorite status:", error);
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
        addFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
