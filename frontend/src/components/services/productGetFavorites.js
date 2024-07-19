import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/products";

export const productGetFavorites = async (token) => {
  try {
    const response = await axios.get(`${URL_API}/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating favorite status:", error.message);
    throw error;
  }
};
