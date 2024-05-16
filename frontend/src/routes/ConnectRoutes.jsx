import { Routes as Rs, Route as R } from "react-router-dom";
import { useContext, useEffect } from "react";

import HomePage from "../views/HomePage.jsx";
import NotFound from "../views/NotFound";
import Login from "../views/Login";
import Register from "../views/Register";
import MyProfile from "../views/MyProfile";
import MyFavorite from "../views/MyFavorite";
import AddProduct from "../views/AddProduct";
import ShowcaseProducts from "../views/ShowcaseProducts.jsx";
import EditProduct from "../views/EditProduct.jsx";
import DetailProductComponent from "../views/DetailProductComponent";
import RouteProtection from "../components/RouteProtection.jsx";
import { UserContext } from "../context/UserContext";

const ConnectRoutes = () => {
  const { userId, username } = useContext(UserContext);
  return (
    <Rs>
      <R path="/" element={<HomePage />} />
      <R path="/auth_user" element={<Login />} />
      <R path="/users" element={<Register />} />
      {/* <R element={<RouteProtection username={username}/>}> */}
        <R path="/addproduct" element={<AddProduct />} />
        <R path="/profile/:id" element={<MyProfile />} />
        <R path="/favorite/:id" element={<MyFavorite />} />
        <R path="/modificar/:id" element={<EditProduct />} />
      {/* </R> */}
      <R path="*" element={<NotFound />} />
      <R path="/allproducts" element={<ShowcaseProducts />} />
      {<R path="/product/:id" element={<DetailProductComponent />} />}{" "}
      {/* arreglar detailproductcomponent , es un componente no una vista */}
    </Rs>
  );
};

export default ConnectRoutes;
