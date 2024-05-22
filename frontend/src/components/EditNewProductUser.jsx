import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { productPut } from "./services/productPut.js";
import "react-toastify/dist/ReactToastify.css";
import PreviewProductUser from "./PreviewProductUser.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
let token = localStorage.getItem("token");

const EditNewProductUser = () => {
  const { id } = useParams();
  const { getMyProducts, products } = useContext(ProductContext);
  const { userId, username } = useContext(UserContext);

  const findProductById = (productId) => {
    return products.find(
      (product) => product.id_product === parseInt(productId)
    );
  };

  const productDescription = findProductById(id);

  const [name, setName] = useState(productDescription.name_product);
  const [description, setDescription] = useState(
    productDescription.description
  );
  const [price, setPrice] = useState(productDescription.price);
  const [quantity, setQuantity] = useState(productDescription.quantity);
  const [state, setState] = useState(productDescription.state);
  const [url_image, setUrl_image] = useState(productDescription.url_image);
  const [id_user, setId_user] = useState();
  const [id_categories, setId_categories] = useState(
    productDescription.id_categories
  );
  const [id_brand, setId_brand] = useState(productDescription.id_brand);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payloadForNewProduct = {
      product: {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        state: state,
        url_image: url_image,
        id_user: userId,
        id_categories: id_categories,
        id_brand: id_brand,
        id_product: id,
      },
    };

    productPut(id, payloadForNewProduct, token)
      .then((response) => {
        setIsLoading(false);
        if (response.updatedProduct) {
          //validacion si la respuesta viene updatedProduct es verdadero. o puede ser codigo 200
          setTimeout(() => {
            getMyProducts();
            navigate(`/profile/${userId}`);
          }, 1000);
        } else {
          console.log("error es", error);
          throw Error("Error al registrar producto.");
        }
      })
      .catch((error) => {
        toast.error("Error al registrar producto: " + error.message, {
          position: "top-center",
          autoClose: 5000,
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
      <section className={`row ${isLoading ? "loading-cursor" : ""}`}>
        <div className="col-12 col-md-6">
          <PreviewProductUser
            name={name ? name : productDescription.name_product}
            description={
              description ? description : productDescription.description
            }
            price={price ? price : productDescription.price}
            url_image={url_image ? url_image : productDescription.url_image}
            username={username}
            state={state ? state : productDescription.state}
            quantity={quantity ? quantity : productDescription.quantity}
          />
        </div>

        <div className="col-12 col-md-6">
          <Form className="m-2 p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription.name_product}
                onChange={(e) => setName(e.target.value)}
                value={name ? name : productDescription.name_product}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRut">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription.description}
                value={
                  description ? description : productDescription.description
                }
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription.price}
                onChange={(e) => setPrice(e.target.value)}
                value={price ? price : productDescription.price}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder={productDescription.quantity}
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity ? quantity : productDescription.quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription.state}
                onChange={(e) => setState(e.target.value)}
                value={state ? state : productDescription.state}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder={productDescription.url_image}
                onChange={(e) => setUrl_image(e.target.value)}
                value={url_image ? url_image : productDescription.url_image}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setId_categories(e.target.value)}
                value={
                  id_categories
                    ? id_categories
                    : productDescription.id_categories
                }
              >
                <option>{productDescription.id_categories}</option>
                <option value="1">Phone</option>
                <option value="2">Laptop</option>
                <option value="3">Smart watch</option>
                <option value="4">Headphones</option>
                <option value="5">Smart Tv</option>
                <option value="6">Mouse</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setId_brand(e.target.value)}
                value={id_brand ? id_brand : productDescription.id_brand}
              >
                <option>{productDescription.id_brand}</option>
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
              </Form.Select>
            </Form.Group>

            <Button
              className="boton rounded-button"
              variant="dark mt-2"
              type="submit"
            >
              Publicar Cambios
            </Button>
          </Form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default EditNewProductUser;
