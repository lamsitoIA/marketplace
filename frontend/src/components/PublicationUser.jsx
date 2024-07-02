import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconHeart from "./IconHeart";
import "./PublicationUser.css";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductContext";

import { Container, Image, Button, Row, Col, Card } from "react-bootstrap";

const PublicationUser = () => {
  let token = localStorage.getItem("token");

  const navigate = useNavigate();

  const {
    product,
    products,
    deleteProduct,
    getMyProducts,
    getFavorites,
    productFav,
    isFavorite,
    handleFavoriteClick,
  } = useContext(ProductContext);

  const { userId, username, url_icons } = useContext(UserContext);
  const userProducts = products.filter((product) => product.id_user === userId);

  useEffect(() => {
    getMyProducts();
    getFavorites(token);
  }, [product, productFav]);

  return (
    <Container>
      <Row>
        <Col sm={4} className="text-center">
          <div>
            <Image
              className="p-3"
              src={url_icons}
              alt="user"
              style={{ width: "180px", height: "180px" }}
            />
            <div>
              <span>¡Hola! </span>
              <h3 class="display-4">{username}</h3>
              <h3 class="display-6">Publicaciones</h3>
            </div>
          </div>
        </Col>
        <Col sm={8} className="text-center">
          <section className="text-center">
            {userId && (
              <>
                <Container className="m-3 d-flex justify-content-between ">
                  <Button
                    className="custom-button"
                    variant="dark"
                    onClick={() => navigate(`/profile/${userId}`)}
                  >
                    Mis publicaciones
                  </Button>
                  <Button
                    className="custom-button"
                    variant="dark"
                    onClick={() => navigate(`/favorite/${userId}`)}
                  >
                    Mis Favoritos
                  </Button>
                </Container>
              </>
            )}
          </section>
          <section className="d-flex flex-wrap">
            {userProducts.map((product, i) => (
              <Col key={i} sm={10} md={10} lg={4} className="mb-3">
                <Card key={i} className="photo m-1 p-2 ">
                  <Card.Img
                    variant="top"
                    src={product.url_image}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <div
                      className="icon-heart-button"
                      onClick={() =>
                        handleFavoriteClick(product.id_product, userId, token)
                      }
                    >
                      <IconHeart
                        className="border_heart"
                        filled={isFavorite(product.id_product)}
                      />
                    </div>
                    <Card.Title>{product.name_product}</Card.Title>
                    <Card.Text>
                      <strong>Marca: {product.name_brand}</strong>
                    </Card.Text>

                    <Card.Text>
                      <strong>stock: {product.quantity}</strong>
                    </Card.Text>
                    <Card.Text>
                      <strong>Estado: {product.state}</strong>
                    </Card.Text>
                    <Card.Text>
                      <strong>Precio: ${product.price}</strong>
                    </Card.Text>

                    <Card.Text>
                      <strong>Publicado por: {product.username}</strong>
                    </Card.Text>
                    <div className="buttontobutton d-flex justify-content-center">
                      <Button
                        variant="dark"
                        className=""
                        onClick={() => {
                          deleteProduct(product.id_product, token);
                        }}
                        style={{ margin: "10px", width: "10rem" }}
                      >
                        Eliminar
                      </Button>

                      <Button
                        variant="dark"
                        className=""
                        onClick={() =>
                          navigate(`/modificar/${product.id_product}`)
                        }
                        style={{ margin: "10px", width: "10rem" }}
                      >
                        Editar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicationUser;
