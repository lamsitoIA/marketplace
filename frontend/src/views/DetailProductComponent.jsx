import { useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Container, Button, Badge, Stack, Image } from "react-bootstrap";
import { FaAnglesLeft } from "react-icons/fa6";

const DetailProductComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromHomePage = location.search.includes("from=homepage");
  const { products } = useContext(ProductContext);
  const { id } = useParams();

  const findProductById = (productId) => {
    return products.find(
      (product) => product.id_product === parseInt(productId)
    );
  };

  const productDescription = findProductById(id);

  return (
    <>
      <section className="row justify-content-center align-items-center m-2">
        <div className="col-12 col-md-6 p-3  text-center ">
          <Image src={productDescription.url_image} fluid />
        </div>
        <div className="col-12 col-md-6 ">
          <Container className="m-3 p-3 ">
            <h1 class="display-2">{productDescription.name_product}</h1>
            <h5 class="display-8">{productDescription.name_brand}</h5>

            <div className="description"></div>
            <div className="price">Precio: ${productDescription.price}</div>
            <p class="lead">{productDescription.description}</p>

            <Stack direction="horizontal" gap={2} >
              <Button variant="outline-dark">
                Estado: <Badge bg="dark">{productDescription.state}</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>

              <Button variant="outline-dark">
                Stock: <Badge bg="dark"> {productDescription.quantity}</Badge>
              </Button>
              <Button variant="outline-dark">
                Vendedor <Badge bg="dark"> {productDescription.username}</Badge>
              </Button>
            </Stack>
            <Stack direction="horizontal" >
              <Button
                className="custom-button m-1"
                variant="dark"
                onClick={() =>
                  fromHomePage ? navigate(`/`) : navigate(`/allproducts`)
                }
              >
                <Badge bg="secondary" className="p-1">
                  <FaAnglesLeft />{" "}
                </Badge>
                 Retornar
              </Button>
            </Stack>
          </Container>
        </div>
      </section>
    </>
  );
};

export default DetailProductComponent;
