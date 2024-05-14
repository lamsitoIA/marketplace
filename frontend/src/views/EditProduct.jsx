import React from "react";
import { useEffect, useState } from "react";
import AddNewProduct from "../components/AddNewProduct.jsx";
import PreviewProduct from "../components/PreviewProduct.jsx";
import EdicionDelNuevoProduct from "../components/EdicionDelNuevoProduct.jsx";
import { productPut } from "../components/services/productPut.js";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Container } from "react-bootstrap";

const EditProduct = () => {
  
  return (
    <>
      <EdicionDelNuevoProduct />
      
    </>
  );
};

export default EditProduct;
