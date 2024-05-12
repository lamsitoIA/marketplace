const URL_API = "http://localhost:3000/api/v1/products"; 


export const productDelete = async (id,token) => {
  console.log("token 2: ",token)
    const response = await fetch( `${URL_API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ token,
      },
      //body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log("data", data)
    return data;
};