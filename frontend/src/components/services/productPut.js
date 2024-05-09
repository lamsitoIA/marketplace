import { GiConsoleController } from "react-icons/gi";

// Reemplazar por la URL de la API
//const URL_API = "http://localhost:3000/api/v1/products"; 
/* import { useParams } from "react-router-dom";
const { id } = useParams(); */

const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

         
export const productPut = async (id,product, token) => {
  console.log("token 2: ",token)
  console.log("prueba de  modificación de producto solicitud de productos ")
    const response = await fetch( `${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token,
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log("data", data)
    return data;
};

// Se encarca de llamar a la api y manejar su respuesta.
