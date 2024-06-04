import axios from "axios";

// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/auth_user";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/auth_user";

export const login = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) { //axios incluye una propiedad response en el objeto error , cuando la solicitud se realiza y el servidor responde con un codigo de estado http diferente a 200 
      throw new Error(error.response.data.error);                              //error.response.data la propiedad data contiene los datos de la respuesta del servidor osea respuesta de error en este caso
    } else {                                                                   // error.response.data.error aca contiene el dato especifico del error que contiene el mensaje de error enviado por el servido
      throw new Error("Unexpected error");                                     //entonces decimos si el error.response contiene un codigo diferente a 200 y error.response.data la respuesta incluye datos y si error.response.data.error incluye el error ,si todo esto se cunple entonces capturamos el error, throw new Error(error.response.data.error);
    }                                                                          // y si algunas de estas condiciones no se cumplen , lanzamos un nuevo error con un mensaje generico unexpected error, error inesperado.
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
