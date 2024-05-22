import axios from "axios";

// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/auth_user";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/auth_user";

export const login = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    return response.data;
  } catch (error) {
    console.error("Error login user:", error.message);
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
