/* import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/cart"; //https://marketplace-backend-vex0.onrender.com
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

export const cartAdd = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    if (response.status !== 200) {
      throw new Error("Data not found");
    }
    console.log("response desde cartAdd", response)
    return response.data;
    
    
  } catch (error) {
    console.error("Error cartAdd carts:", error.message);
  }
}; */
/* import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/cart"; //https://marketplace-backend-vex0.onrender.com/
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

export const cartAdd = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    if (response.status !== 200) {
      throw new Error("Data not found");
    }
    console.log("response desde cartAdd", response)
    return response.data;


  } catch (error) {
    console.error("Error cartAdd carts:", error.message);
  }
}; */
import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/cart";
export const cartAdd = async (newCartItem) => {
  const { id_user_newCartItem, id_product_newCartItem, quantity_newCartItem } =
    newCartItem;
  try {
    const post = {
      id_user_newCartItem,
      id_product_newCartItem,
      quantity_newCartItem,
    };

    console.log("id_user cartAdd", id_user_newCartItem);
    const response = await axios.post(`${URL_API}/${id_user_newCartItem}`, post);
    console.log("post enviado:", post);
    console.log("response.status desde cartAdd", response.status);
    if (response.status !== 201) {
      console.log("Respuesta del servidor:", response);
      throw new Error("Data not found");
    }
    //console.log("response desde cartAdd", response)
    return response.data;
  } catch (error) {
    console.error("Error cartAdd carts:", error.message);
    console.error("Error completo:", error);
  }
};


