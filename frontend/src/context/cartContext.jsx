import { createContext, /* useContext, */ useState } from "react";
import { cartDelete } from "../components/services/cartDelete";
///import { ProductContext } from "./ProductContext";
import { cartPut } from "../components/services/cartPut";
import { cartAdd } from "../components/services/cartAdd";
import { UserContext } from "../context/UserContext.jsx";
import { getCartAll } from "../components/services/getCartAll.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartproduct, setCartproduct] = useState([]);
  const [cartproducts, setCartproducts] = useState([]);
  
  // const { getMyProducts } = useContext(ProductContext);


  const getMyCart = async (id_user) => {//
    try {
      const response = await getCartAll(id_user);//Esta función es responsable de obtener todo el contenido del carrito del usuario.
      setCartproducts(response.productsCart.map((product) => ({ ...product })));
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