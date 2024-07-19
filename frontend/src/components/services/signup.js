import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/users";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/users";

export const signup = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    return response.data;
  } catch (error) {
    console.error("Error signup user:", error.message);
    return {
      userCreated: false, //esta propiedad indica que la creacion del usuario no se realizo con exito
      error: error.response && error.response.data ? error.response.data.error : error.message
    }; // aca digo si error.response y error.repsonse.data es true, entonces retorname el error.response.data.error que es donde va a estar el mensaje de error especifico que nos manda la api y si es false retorname un mensaje el messaje lo propociona axios y es un mensaje generico
  }
};

// Se encarca de llamar a la api y manejar su respuesta.Cualquiercosa
