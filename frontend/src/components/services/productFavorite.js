import axios from "axios";
const URL_API = "http://localhost:3000/api/v1/products";

export const productFavorite = async (id, isFavorite, token) => {
    try {
      console.log("Sending PATCH request:", { id, isFavorite });
      const response = await axios.patch(
        `${URL_API}/${id}/favorite`,
        { isFavorite },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from PATCH request:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating favorite status:", error.message);
      throw error;
    }
  };