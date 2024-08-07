import {
  createCart,
  AllCart,
  updateCart,
  deleteproductcart,

} from "../models/cartModel.js";
//import {getProductById} from "../models/productModel.js"

import { findError } from "../utils/utils.js";

//get all cart
export const getAllCart = async (req, res) =>{
 
    try {
      const { id_user } = req.params;
      if (id_user !== undefined) {
        // Usa id_user aquí
        console.log("id_user pruebas", id_user)
      } else {
        console.log ("Maneja el caso cuando id_user no está definido")
      }
      

      console.log("req.params de controller",req.params ) 
      //const idUser = req.user.id_user;
      console.log("userId desde controller",id_user)
      //validar iduser
      if (!id_user) {
        return res.status(401).json({ error: 'No tienes permisos para realizar esta acción' });
      }

      const allproductsCart = await AllCart(id_user);
      console.log("allproductsCart",allproductsCart)
    
     /*  if (allproductsCart.rowcount ===0){
        return res.status(404).json({ error: 'No hay productos en el carrito' });
      } */
     
        return res.status(200).json({ productsCart: allproductsCart });
      
    
      //res.json(products);
    } catch (error) {
      console.log(error);
      const errorFound = findError(error.code); // Función para encontrar y manejar errores específicos
      return res
        .status(errorFound[0]?.status)
        .json({ error: errorFound[0]?.message }); // Enviar mensaje de error con el código de estado correspondiente
    }
   /*  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener productos del carrito' });
    } */
}


//create cart
export const addtoCart = async (req, res) => {
  try {
    const { id_user } = req.params; // Obtener el id del usuario
    const {id_product_newCartItem, quantity_newCartItem } = req.body; // Obtener los datos del producto y la cantidad a agregar
    console.log("req.bodyPrueba",req.body);
    const createdCartItem = await createCart(
     id_user,
     id_product_newCartItem,
     quantity_newCartItem
    ); // Llamar a la función para crear el producto en la base de datos
    res.status(201).json({ newCartItem: createdCartItem }); // Enviar el nuevo producto como respuesta al frontend
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code); // Función para encontrar y manejar errores específicos
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message }); // Enviar mensaje de error con el código de estado correspondiente
  }
};

// Función para actualizar un producto en el carrito de compras
export const updateCartItem = async (req, res) => {
  try {
    const { id_cart } = req.params;
    console.log("id carrito", id_cart)
    const { quantity_cart } = req.body; // Obtener la cantidad a actualizar
    const updatedCartItem = await updateCart(id_cart, quantity_cart); // Llamar a la función para actualizar el producto en la base de datos
    res.status(200).json({ updatedCartItem: updatedCartItem }); // Enviar el producto actualizado como respuesta
  } catch (error) {
    console.log(error);
    const errorFound = findError(error.code); // Función para encontrar y manejar errores específicos
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message }); // Enviar mensaje de error con el código de estado correspondiente
  }
};

// Función para eliminar un producto del carrito de compras
export const deleteCart = async (req, res) => {
  try {
    const {  id_cart } = req.params; // Obtener el ID del producto a eliminar
    const deletedCartItem = await deleteproductcart( id_cart); // Llamar a la función para eliminar el producto de la base de datos

    if (deletedCartItem === 0) {
      return res
        .status(404)
        .json({ message: "El producto no existe en el carrito" });
    }

    return res.status(204).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    const errorFound = findError(error.code); // Función para encontrar y manejar errores específicos
    return res
      .status(errorFound[0]?.status)
      .json({ error: errorFound[0]?.message }); // Enviar mensaje de error con el código de estado correspondiente
  }
};

