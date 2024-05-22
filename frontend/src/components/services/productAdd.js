import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/products"; //https://marketplace-backend-vex0.onrender.com
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

export const productAdd = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    return response.data;
  } catch (error) {
    console.error("Error productAdd products:", error.message);
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
