import { GiConsoleController } from "react-icons/gi";
import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/products";
/*  import { useParams } from "react-router-dom";
const { id } = useParams(); 
const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

 */
/* export const productPut = async (id, product, token) => {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  console.log(data)
  return data;
}; */

export const productPut = async (id, product, token) => {
  try {
    const response = await axios.put(`${URL_API}/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    console.log( response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
