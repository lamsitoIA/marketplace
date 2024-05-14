import { GiConsoleController } from "react-icons/gi";

// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/api/v1/products"; 
/* import { useParams } from "react-router-dom";
const { id } = useParams(); */

//const URL_API = "https://marketplace-if9n.onrender.com/api/v1/products";

         
export const productPut = async (id,product, token) => {
  console.log("token 2: ",token)
  console.log("prueba de  modificación de producto solicitud de productos ")
    const response = await fetch( `${URL_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", //aqui le decimos que el contenido esta json
        "Authorization": "Bearer "+ token, //aca le pasamos el token, yaque es la ruta esta protegida
      },
      body: JSON.stringify(product), //para convertir el cuerpo de javascript que escribio el usuario y transformarlo a json para poder mandarlo al backend.
    });
    const data = await response.json(); //aqui quedaria la respuesta del backend
    console.log("data", data)
    return data; //aqui retornamos el cuerpo del backend
};

// Se encarca de llamar a la api y manejar su respuesta.
