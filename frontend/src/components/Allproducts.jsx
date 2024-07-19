import React, { useState, useContext, useEffect } from "react";
import { Badge, Container, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IconHeart from "./IconHeart";
import { ToastContainer, toast } from "react-toastify";
/* import "../components/AllProducts.css"; */
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { CartContext } from "../context/cartContext";
const Allproducts = ({
  isHomePage,
  isFilterDescrip,
  isFilterBrand,
  numCards,
  columnClass,
}) => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {
    product,
    products,
    getMyProducts,
    getFavorites,
    productFav,
    isFavorite,
    handleFavoriteClick,
  } = useContext(ProductContext);
  const {addProductToCart} = useContext(CartContext)
  const { userId } = useContext(UserContext);
  const [filter, setFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 999.999]);
  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };
  const handlePriceChange = (_, newValue) => {
    setPriceRange(newValue);
  };
  const handleBrandChange = (e) => {
    setBrandFilter(e.target.value.toLowerCase());
  };
  const filteredProducts = products.filter((product) => {
    const matchesFilter =
      product.name_product.toLowerCase().includes(filter) ||
      product.description.toLowerCase().includes(filter);
    const matchesBrand =
      !brandFilter || product.id_brand === parseInt(brandFilter);
    const matchesPriceRange =
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1];
    return matchesFilter && matchesBrand && matchesPriceRange;
  });
  const clearFilters = () => {
    setFilter("");
    setBrandFilter("");
    setPriceRange([0, 999.999]); // Restablecer el rango de precios
  };
  useEffect(() => {
    getMyProducts();
    getFavorites(token);
  }, [ product, productFav]);
  
  const handleAddToCart = (productId) => {
    if (userId) {
      addProductToCart(productId, userId);
    } else {
      toast.error(
        "Debes iniciar sesión para agregar al carrito",
        {
          position: "bottom-right",
          autoClose: 1900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col sm={2} className="text-center mt-5">
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
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Filtrar por Marca"
                    value={brandFilter}
                    onChange={handleBrandChange}
                  >
                    <option value="">Selecciona una marca</option>
                    <option value="1">SAMSUNG</option>
                    <option value="2">LG</option>
                    <option value="3">APPLE</option>
                    <option value="4">DELL</option>
                    <option value="5">SONY</option>
                    <option value="6">LENOVO</option>
                    <option value="7">HP</option>
                    <option value="8">BOSE</option>
                    <option value="9">APPLE WATCH</option>
                    <option value="10">SONY WATCH</option>
                    <option value="11">FITBIT WATCH</option>
                    <option value="12">SAMSUNG WATCH</option>
                    <option value="13">XIAOAMI</option>
                    <option value="14">HUAWEI</option>
                  </select>
                </div>
              </div>
              <div className="filter_price">
                <Typography id="range-slider" gutterBottom>
                  Rango de precios
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={999.999}
                />
              </div>
              <Button
                className="boton"
                variant="secondary"
                onClick={clearFilters}
              >
                Limpiar Filtros
              </Button>
            </div>
          </Col>
          <Col sm={10} className="text-center">
            <section className="d-flex flex-wrap">
              {filteredProducts.map((product, index) => (
                <div key={index} className=" m-2 d-flex align-items-stretch">
                  <Card style={{ width: "19rem" }}>
                    <Card.Img variant="top" src={product.url_image} />
                    <Card.Body>
                      <div // Botón del corazón
                        className="icon-heart-button" // Estilo CSS opcional
                        onClick={() => {
                          if (!userId) {
                            toast.error(
                              "Debes iniciar sesión para agregar a favoritos",
                              {
                                position: "bottom-right",
                                autoClose: 1900,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                              }
                            );
                          } else {
                            handleFavoriteClick(
                              product.id_product,
                              userId,
                              token
                            );
                          }
                        }}
                      >
                        <IconHeart
                          className="border_heart"
                          filled={isFavorite(product.id_product, userId)}
                        />
                      </div>
                      <Card.Title> {product.name_product}</Card.Title>
                      <Card.Text>
                        <strong>Marca: {product.name_brand}</strong>
                      </Card.Text>
                      <Card.Text>
                        <strong>Precio: ${product.price}</strong>
                      </Card.Text>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>
                        <strong>Publicado por: {product.username}</strong>
                      </Card.Text>
                      <div>
                        <Badge variant="dark">{product.name}</Badge>
                      </div>
                    </Card.Body>
                    <div className="buttontobutton d-flex justify-content-center">
                      <Button
                        variant="dark"
                        className=""
                        onClick={() =>
                          navigate(
                            `/product/${product.id_product}?from=allproducts-details`
                          )
                        }
                        style={{ margin: "10px", width: "10rem" }}
                      >
                        Ver detalles
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleAddToCart(product.id_product)}
                        style={{ margin: "10px", width: "10rem" }}
>
                        Agregar al Carrito
                      </Button>
                    </div>
                    <ToastContainer />
                  </Card>
                </div>
              ))}
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Allproducts;