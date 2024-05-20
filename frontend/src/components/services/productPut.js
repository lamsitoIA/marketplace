import { GiConsoleController } from "react-icons/gi";
import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/products";
/* 
const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

 */

export const productPut = async (id, product, token) => {
  try {
    const response = await axios.put(`${URL_API}/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
