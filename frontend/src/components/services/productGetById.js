import axios from "axios";
// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/products";
//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

export const productGetById = async (id) => {
  try {
    const response = await axios.get(`${URL_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

// Se encarca de llamar a la api y manejar su respuesta.
/* router.get("/products/:id", getProductsById); */
