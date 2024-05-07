import React from "react";
import { useEffect, useState } from "react";
import AddNewProduct from "../components/AddNewProduct.jsx";
import PreviewProduct from "../components/PreviewProduct.jsx";
import { addPost } from "../components/services/postService.js";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { Container } from "react-bootstrap";

const AddProduct = () => {
  const [posts, setPosts] = useState([]);

  const createProduct = (post) => {
    addPost(post)
      .then((data) => {
        setPosts([...posts, data]);
        toast.success("Te has registrado exitosamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((err) => {
        toast.error("No se pudo crear el Post ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
   <>
      <AddNewProduct createProduct={createProduct} />

      <ToastContainer />
      </>
  );
};

export default AddProduct;
