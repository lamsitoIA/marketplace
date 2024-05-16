import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import IconHeart from "./IconHeart";
import { ToastContainer, toast } from "react-toastify";
import "../components/AllproductsComponent.css";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import "../components/CardHomePage.css";
//import Footerlam from "../components/Footerlam.jsx";

const CardHomePage = ({
  isHomePage,
  isFilterDescrip,
  isFilterBrand,
  numCards,
}) => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const {userId } = useContext(UserContext);
  const [filter] = useState("");
  const [brandFilter] = useState("");
  const [priceRange] = useState([0, 999.999]);


  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      product.name_product.toLowerCase().includes(filter) ||
      product.description.toLowerCase().includes(filter);
  
    const matchesBrand = !brandFilter || product.id_brand === parseInt(brandFilter);
  
    const matchesPriceRange =
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1];
  
    return matchesFilter && matchesBrand && matchesPriceRange;
  });

  const addFavorite = (id) => {
    const newProducts = products.map((product) => {
      if (product.id_product === id) {
        return {
          ...product,
          isFavorite: !product.isFavorite,
        };
      }
      return product;
    });
    setProducts(newProducts);
  };

  const addFavoriteOnClick = (id) => {
    if (!userId) {
      toast.error("Debes iniciar sesión para agregar a favoritos", {
        position: "bottom-right",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="container">
      {isHomePage && (
        <div className="input_filter">
          <div className="input_filter_namebrand">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filtrar por nombre"
                onChange={handleFilterChange}
                value={filter}
              />
            </div>
          </div>
        </div>
      )}
      <div className="row row-cols-md-3 justify-content-center">
        {filteredProducts.slice(0, numCards).map((product, index) => (
          <div key={index} className="col mb-5">
            <Card style={{ width: "18rem" }} className="h-100 mx-auto">
              <Card.Img variant="top" src={product.url_image} />
              <Card.Body>
              <div // Botón del corazón
                  className="icon-heart-button" // Estilo CSS opcional
                  onClick={() => addFavoriteOnClick(product.id_product)} // Llama a la función addFavoriteOnClick
                >
                  <IconHeart
                    className="border_heart"
                    filled={product.isFavorite}
                  />
                </div>
                {<Card.Title>{product.name_product}</Card.Title>}
                <Card.Text>
                  <strong>Precio: ${product.price}</strong>
                </Card.Text>
                {isFilterBrand && (
                  <Card.Text>
                    <strong>Marca: {product.name_brand}</strong>
                  </Card.Text>
                )}
                {isFilterDescrip && (
                  <Card.Text>{product.description}</Card.Text>
                )}
                <Card.Text>
                  <strong>Publicado por: {product.username}</strong>
                </Card.Text>
                <div>
                  <Badge variant="dark">{product.name}</Badge>
                </div>
                <Button
                  className="button-ver-detalles w-100"
                  variant="dark"
                  //onClick={() => navigate(`/allproducts/${product.id_product})} 
                  onClick={() => navigate(`/product/${product.id_product}?from=homepage`)}
                  style={{ margin: "10px", width: "10rem" }}
                >
                  Ver detalles
                </Button>
              </Card.Body>
              <ToastContainer />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHomePage;
