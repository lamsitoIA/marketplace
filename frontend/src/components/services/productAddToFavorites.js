import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/products";

export const productAddToFavorites = async (id_user, id_product) => {
  try {
    const response = await axios.post(`${URL_API}/${id_user}/favorite`, {
      id_user,
      id_product,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating favorite status:", error.message);
    throw error;
  }
};
