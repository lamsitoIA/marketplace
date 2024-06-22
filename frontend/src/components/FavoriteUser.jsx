import { useContext, useEffect } from "react";
import { Container, Image, Button, Row, Col, Card } from "react-bootstrap";
import IconHeart from "./IconHeart";
import "./FavoriteUser.css";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";

const FavoriteUser = ({ userId, username }) => {
  let token = localStorage.getItem("token");

  const navigate = useNavigate();
  const { url_icons } = useContext(UserContext);

  const { getFavorites, deleteProductFromFavorites, productsFav, isFavorite } =
    useContext(ProductContext);

  useEffect(() => {
    getFavorites(token);
  }, []);

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
              <h3 class="display-6">Favoritos♥️</h3>
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

          <Row sm={10} className="text-center">
            <section className="d-flex flex-wrap">
              {productsFav.map((product, i) => (
                <div key={i} className=" m-2 d-flex align-items-stretch">
                  <Card key={i} style={{ width: "16rem" }}>
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
                      <Card.Title>{product.name_product}</Card.Title>
                      <Card.Text>
                        <strong>Marca: {product.name_brand}</strong>
                      </Card.Text>
                      <Card.Text>
                        <strong>Precio: ${product.price}</strong>
                      </Card.Text>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text></Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted p-2">
                      <div
                        className="icon-heart-button "
                        onClick={() =>
                          deleteProductFromFavorites(product.id_product, token)
                        }
                      >
                        <IconHeart
                          className="border_heart"
                          filled={isFavorite(product.id_product)}
                        />
                      </div>
                      <strong> Vendedor: {product.username} </strong>
                    </Card.Footer>
                  </Card>
                </div>
              ))}
            </section>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteUser;
