import pool from "../../../../config/db/connectionDb.js";

//get all
export const getAllProduct = async () => {
  const SQLquery = {
    text: "SELECT p.id_product , p.name AS name_product , p.description, p.price , p.quantity , p.state ,p.isFavorite , p.url_image , p.id_user , u.name AS username , p.id_categories , c.name AS category , p.id_brand , b.name AS name_brand FROM products AS p JOIN categories AS c ON p.id_categories = c.id_categories JOIN brands AS b ON b.id_brand = p.id_brand JOIN users AS u ON u.id_user = p.id_user;",
  };
  const response = await pool.query(SQLquery);
  return response.rows;
};

//get by id
export const getProductById = async (id) => {
  const SQLquery = {
    text: "SELECT p.id_product, p.name AS name_product , p.description, p.price , p.quantity, p.state , p.isFavorite , p.url_image , p.id_user , u.name AS user_name , p.id_categories , c.name AS category , p.id_brand, b.name AS name_brand FROM products AS p JOIN categories AS c ON p.id_categories = c.id_categories JOIN brands AS b ON b.id_brand = p.id_brand JOIN users AS u ON u.id_user = p.id_user WHERE id_product = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//post
export const createProduct = async ({
  name,
  description,
  price,
  quantity,
  state,
  isFavorite = false,
  url_image,
  id_user,
  id_categories,
  id_brand,
}) => {
  const SQLquery = {
    text: "INSERT INTO products (name, description, price, quantity, state ,isFavorite, url_image, id_user, id_categories, id_brand) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
    values: [
      name,
      description,
      price,
      quantity,
      state,
      isFavorite,
      url_image,
      id_user,
      id_categories,
      id_brand,
    ],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//update
export const updateProduct = async (
  id_product,
  {
    name,
    description,
    price,
    quantity,
    state,
    isFavorite = false,
    url_image,
    id_user,
    id_categories,
    id_brand,
  }
) => {
  const SQLquery = {
    text: "UPDATE products SET name = $1, description = $2, price = $3, quantity = $4, state = $5 , isFavorite = $6, url_image = $7, id_user = $8, id_categories = $9, id_brand = $10 WHERE id_product = $11 RETURNING *",
    values: [
      name,
      description,
      price,
      quantity,
      state,
      isFavorite,
      url_image,
      id_user,
      id_categories,
      id_brand,
      id_product,
    ],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

//update
export const setFavorite = async (id, isFavorite) => {
  const SQLquery = {
    text: "UPDATE products SET isFavorite = $1 WHERE id_product = $2 RETURNING *",
    values: [isFavorite, id],
  };
  console.log("Executing query:", SQLquery);
  const response = await pool.query(SQLquery);
  return response;
};

//delete
export const deleteProduct = async (id) => {
  const SQLquery = {
    text: "DELETE FROM products WHERE id_product = $1",
    values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
};
