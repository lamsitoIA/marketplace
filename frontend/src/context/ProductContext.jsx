import { createContext, useEffect, useState } from "react";
import { productsGet } from "../components/services/productGet.js";
import { productGetById } from "../components/services/productGetById.js";
import { productDelete } from "../components/services/productDelete.js";
import { productFavorite } from "../components/services/productFavorite.js";
import { productAddToFavorites } from "../components/services/productAddToFavorites.js";
import { productGetFavorites } from "../components/services/productGetFavorites.js";
import { productDeleteFavorite } from "../components/services/productDeleteFavorite.js";
import { productAdd } from "../components/services/productAdd.js";
import { productPut } from "../components/services/productPut.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [productUpdate, setProductUpdate] = useState([]);
  const [productFav, setProductFav] = useState([]);
  const [productsFav, setProductsFav] = useState([]);

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
      return response;
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  };

  const updatedProduct = async (id, product, token) => {
    try {
      const response = await productPut(id, product, token);
      setProductUpdate(response.updatedProduct);
      return response;
    } catch (error) {
      console.error("Error updating  product by ", error);
    }
  };

  const deleteProduct = async (productId, token) => {
    try {
      await productDelete(productId, token);
      getMyProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const publicarProducto = async (newProduct) => {
    try {
      const response = await productAdd(newProduct);
      setProduct(response.newProduct);
      return response;
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addToFavorites = async (id_product, id_user) => {
    try {
      const response = await productAddToFavorites(id_user, id_product);
      setProductFav(response.addToFavorite);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const getFavorites = async (token) => {
    try {
      const favoriteProducts = await productGetFavorites(token);
      setProductsFav(favoriteProducts.allProductsFavorite);
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    }
  };

  const deleteProductFromFavorites = async (productId, token) => {
    try {
      await productDeleteFavorite(productId, token);
      const favoriteProducts = await productGetFavorites(token);
      setProductsFav(favoriteProducts.allProductsFavorite);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const isFavorite = (productId, userId ) => {
    if(!userId){
      return false
    }else{
    return productsFav.some(
      (favProduct) => favProduct.id_product === productId
    )};
  };

  const handleFavoriteClick = async (productId, userId, token) => {
    if (isFavorite(productId, userId)) {
      await deleteProductFromFavorites(productId, token);
    } else {
      await addToFavorites(productId, userId);
    }
    await getFavorites(token);
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        products,
        productFav,
        productsFav,
        setProduct,
        setProducts,
        setProductFav,
        setProductsFav,
        getMyProducts,
        getProductById,
        deleteProduct,
        addToFavorites,
        getFavorites,
        publicarProducto,
        deleteProductFromFavorites,
        isFavorite,
        handleFavoriteClick,
        updatedProduct,
        productUpdate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
