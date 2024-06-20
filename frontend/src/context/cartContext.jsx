import { createContext, /* useContext, */ useState } from "react";
//import { getCartAll } from "../components/services/getCartAll";
import { cartDelete } from "../components/services/cartDelete";
///import { ProductContext } from "./ProductContext";
import { cartPut } from "../components/services/cartPut";
import { cartAdd } from "../components/services/cartAdd";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
 // const { getMyProducts } = useContext(ProductContext);

 const addProductToCart = async (productId, quantity) => {
  try {
      const product = await /* getCartAll */ cartAdd(productId);
      if (product) {
          const newCart = [...cart]; // Copia del array cart
          const existingProductIndex = newCart.findIndex(item => item.id === productId);
          if (existingProductIndex !== -1) {
              newCart[existingProductIndex].quantity += quantity;
          } else {
              newCart.push({ id: productId, name: product.name, price: product.price, quantity });
          }
          setCart(newCart);
          console.log("newCart desde context", newCart)
      }
  } catch (error) {
      console.error("Error adding product to cart:", error);
  }
};



  const removeProductFromCart = async (productId) => {
    try {
      await cartDelete(productId);
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

 /*  const removeProductFromCart = async (productId) => {
    try {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
 */
  const updateProductQuantity = async (productId, quantity) => {
    try {
      const response = await cartPut(productId, quantity);
      if (response) {
        const newCart = { ...cart };
        if (newCart[productId]) {
          newCart[productId].quantity = quantity;
        }
        setCart(newCart);
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};