import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/users/auth_google";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/users";

export const signupAuthGoogle = async (post) => {
  try {
    const response = await axios.post(URL_API, post);
    return response.data;
  } catch (error) {
    console.error("Error signup user:", error.message);
    return {
      userCreated: false,
      error: error.response && error.response.data ? error.response.data.error : error.message
    };
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
