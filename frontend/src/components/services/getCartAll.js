import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/cart";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

export const getCartAll = async (id_user) => {
  try {
    const response = await axios.get(`${URL_API}/${id_user}`);

    //console.log("Cart: " + JSON.stringify(response))
    console.log("le estoy pasando al back este id", id_user)
    return response.data;

  } catch (error) {
    console.error("Error fetching carts:", error.message);
  }
};