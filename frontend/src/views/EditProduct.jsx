import React from "react";
import { useEffect, useState } from "react";
import AddNewProduct from "../components/AddNewProduct.jsx";
import PreviewProduct from "../components/PreviewProduct.jsx";
import EdicionDelNuevoProduct from "../components/EdicionDelNuevoProduct.jsx";
import { productPut } from "../components/services/productPut.js";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Container } from "react-bootstrap";

const EditProduct = () => {
  const [publicacion, setPublicacion] = useState([]);

  const cambiodeInfoProducto = (publicacion) =>{
    productPut(publicacion).then((data) =>{
      setPublicacion([... publicacion, data]);
    }).catch((err)=>{
      console.log(err)
    })
  }
  console.log("estoy en modificación de producto ")
  return (
    <>
      <EdicionDelNuevoProduct cambiodeInfoProducto={cambiodeInfoProducto}  />
      
    </>
  );
};

export default EditProduct;
