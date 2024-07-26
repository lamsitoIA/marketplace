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

  const addProductToCart = async (productId, id_user) => {
    // Primero, obtén el carrito actual
    const currentCart = await getCartAll(id_user); // Obtiene el carrito actual

    // Verifica si el producto ya existe en el carrito
    const existingProductIndex = currentCart.productsCart.findIndex(item => item.id_product_newCartItem === productId);
    if (existingProductIndex === -1)/* (!existingProductIndex) */ {
        // Si el producto no existe, crea un nuevo elemento de carrito
        const newCartItem = {
            id_user_newCartItem: id_user,
            id_product_newCartItem: productId,
            quantity_newCartItem: 1,
        };

        try {
            const agregandoAlCarro = await cartAdd(newCartItem); // Llama a la función para agregar el nuevo producto
            setCartproduct(prevCart => [...prevCart, agregandoAlCarro]); // Actualiza el estado del carrito
            return agregandoAlCarro; // Retorna el objeto con sus valores llamado del servidor
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    } else {
        // Si el producto ya existe, no lo agregamos
        console.log("El producto ya existe en el carrito y no se agregará nuevamente.");
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