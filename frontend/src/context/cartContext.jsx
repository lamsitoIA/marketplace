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
  const [cartproduct, setCartproduct] = useState([]);
  const [cartproducts, setCartproducts] = useState([]);
  
  // const { getMyProducts } = useContext(ProductContext);


  const getMyCart = async (id_user) => {//
    try {
      const response = await getCartAll(id_user);//Esta función es responsable de obtener todo el contenido del carrito del usuario.
      setCartproduct(response.productsCart.map((product) => ({ ...product })));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProductToCart = async (productId, id_user) => {//Esta función se encarga de añadir un nuevo producto al carrito de compra del usuario
    const newCartItem = {
      id_user_newCartItem: id_user,//clave y valor
      id_product_newCartItem: productId,
      quantity_newCartItem: 1,
    };
    const {
      id_user_newCartItem,
      id_product_newCartItem,
      quantity_newCartItem,
    } = newCartItem;

    try {
      const agregandoAlCarro = await cartAdd(newCartItem);//Llama a la función, que  realiza una solicitud de API para agregar el nuevo artículo al carrito del usuario
      //se le pasa el objeto newCartItem que continen id usuario, id producto y la cantidad
      setCartproduct(agregandoAlCarro);
/*       console.log("getMyCart",getMyCart(id_user)) */
      return agregandoAlCarro;//retorna el objeto con sus valores llamado del servidor 
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
      const newCart = { ...cartproduct };
      delete newCart[productId];
      setCartproduct(newCart);
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
        const newCart = { ...cartproduct };
        if (newCart[productId]) {
          newCart[productId].quantity = quantity;
        }
        setCartproduct(newCart);
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartproduct, 
        setCartproduct,
        cartproducts, 
        setCartproducts,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantity,
        getMyCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};