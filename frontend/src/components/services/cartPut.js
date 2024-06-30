import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/cart";
/* 
const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

 */
//se aplico axios, la diferencia esque no es necesario transformarlo a formato json, porque ya axios lo hace internamente.
// line 12 hacemos la llamada al metodo put a la url de la solicitud.
export const cartPut = async (id, quantity) => {
  try {
    const response = await axios.put(`${URL_API}/${id}`, quantity);
    return response.data;
  } catch (error) {
    console.error("Error editing carts:", error.message);
  }
};