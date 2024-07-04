import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/cart";

export const cartDelete = async (id) => {
  try {
    const response = await axios.delete(`${URL_API}/${id}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting cart: ", error.message);
  }
};