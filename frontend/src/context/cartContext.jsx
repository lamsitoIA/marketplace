import { createContext, /* useContext, */ useState } from "react";
//import { getCartAll } from "../components/services/getCartAll";
import { cartDelete } from "../components/services/cartDelete";
///import { ProductContext } from "./ProductContext";
import { cartPut } from "../components/services/cartPut";
import { cartAdd } from "../components/services/cartAdd";
import {getCartAll} from "../components/services/getCartAll.js"
import { UserContext } from "../context/UserContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartporduct, setCartporduct] = useState([]);
  const [cartporducts, setCartporducts] = useState([]);
  
  // const { getMyProducts } = useContext(ProductContext);


  const getMyCart = async (id_user) => {
    try {
      const response = await getCartAll(id_user);//Esta función es responsable de obtener todo el contenido del carrito del usuario.
      console.log("response context", response)
      setCartproducts(response.productsCart.map((product) => ({ ...product })));

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProductToCart = async (productId, id_user) => {
    const newCartItem = {
      id_user_newCartItem: id_user,
      id_product_newCartItem: productId,
      quantity_newCartItem: 1,
    };
    const {
      id_user_newCartItem,
      id_product_newCartItem,
      quantity_newCartItem,
    } = newCartItem;

    try {
      const agregandoAlCarro = await cartAdd(newCartItem);
      setCartporduct(agregandoAlCarro);
/*       console.log("getMyCart",getMyCart(id_user)) */
      return agregandoAlCarro;
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }

    /*     try {
      console.log("id_user addProductTocart", id_user);

      const product = await cartAdd(id_user);
      if (product) {
        const newCart = [...cart]; // Copia del array cart
        const existingProductIndex = newCart.findIndex(
          (item) => item.id === productId
        );
        if (existingProductIndex !== -1) {
          //Valor de -1: En JavaScript, es un valor especial que indica que un elemento no ha sido encontrado
          //en un conjunto utilizando el método .-1(findIndex)
          newCart[existingProductIndex].quantity += quantity; //Si el producto ya está en la cesta, se incrementa su cantidad
        } else {
          newCart.push({ id: productId, quantity, id_user: id_user }); // Si el producto no está en la cesta, se agrega
        }
        setCart(newCart); // Se actualiza el estado de la cesta
        console.log("newCart desde context", newCart);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } */
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
        cartporduct,
        setCartporduct,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
