
import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/cart";
export const cartAdd = async (newCartItem) => {//newCartItem proviene del controlador
  const { id_user_newCartItem, id_product_newCartItem, quantity_newCartItem } =
    newCartItem;//La función desestructura el objeto para extraer las propiedades individuales.newCartItem
  try {
    const post = {//Crea un nuevo objeto con las mismas propiedade
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
    return response.data;//La propiedad (data)pertenece al objeto de respuesta que devuelve Axios después de realizar una solicitud de API
  } catch (error) {
    console.error("Error cartAdd carts:", error.message);
    console.error("Error completo:", error);
  }
};


