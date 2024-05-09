// Reemplazar por la URL de la API
//const URL_API = "http://localhost:3000/api/v1/products"; 
const URL_API = "http://marketplace-if9n.onrender.com/api/v1/products";
              
export const productsGet = async () => {
  
  console.log("prueba de solicitud de productos ")
    const response = await fetch(URL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("data", data)
    return data;
};

// Se encarca de llamar a la api y manejar su respuesta.
