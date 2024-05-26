import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/products";

export const productDelete = async (id, token) => {
  try {
    const response = await axios.delete(`${URL_API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error("Error deleting product: ", error.message);
  }
};
