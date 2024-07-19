// models/cartModel.js
import pool from "../../../../config/db/connectionDb.js";

// Función para crear un producto en el carrito de compras
export const createCart = async (id_user, id_product, quantity) => {
  const SQLquery = {
    text: "INSERT INTO cart_items (id_user, id_product, quantity) VALUES ($1, $2, $3) RETURNING *",
    values: [id_user, id_product, quantity],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

// Función para obtener todos los productos del carrito de un usuario
export const AllCart = async (id) => {
  const SQLquery = {
    text: "SELECT ci.id, ci.quantity, ci.id_user AS id_comprador, p.name, p.price, p.quantity AS stock, p.url_image, p.description FROM  cart_items AS ci INNER JOIN products AS p ON ci.id_product = p.id_product WHERE ci.id_user = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  console.log("obtener todos los productos", response);
  return response.rows;
};

// Función para actualizar un producto en el carrito
export const updateCart = async (id, quantity) => {
  const SQLquery = {
    text: "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
    values: [quantity, id],
  };
  console.log("SQLqueryupdate", SQLquery)
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

// Función para eliminar un producto del carrito
export const deleteproductcart = async (id) => {
  const SQLquery = {
    text: "DELETE FROM cart_items WHERE id = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
};