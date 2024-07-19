import { useContext, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreviewProductUser from "./PreviewProductUser.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

const EditNewProductUser = () => {
  const { id } = useParams();
  const {
    getMyProducts,
    products,
    updatedProduct,
    getProductById,
    product,
    setProduct,
  } = useContext(ProductContext);
  const { userId, username } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    getProductById(id);
  }, [product.id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevUpdateProduct) => ({
      ...prevUpdateProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updatedProduct(product.id_product, product, token);
      if (response) {
        toast.success("Product updated successfully");
        navigate(`/profile/${userId}`);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className={`row ${isLoading ? "loading-cursor" : ""}`}>
        <div className="col-12 col-md-6">
          <PreviewProductUser
            name={product.name_product}
            description={product.description}
            price={product.price}
            url_image={product.url_image}
            username={username}
            state={product.state}
            quantity={product.quantity}
          />
        </div>

        <div className="col-12 col-md-6">
          <Form className="m-2 p-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name_product"
                value={product.name_product}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuantity">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={product.state}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUrlImage">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="url_image"
                value={product.url_image}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategories">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                name="id_categories"
                value={product.id_categories}
                onChange={handleInputChange}
              >
                <option>{product.id_categories}</option>
                <option value="1">Phone</option>
                <option value="2">Laptop</option>
                <option value="3">Smart watch</option>
                <option value="4">Headphones</option>
                <option value="5">Smart Tv</option>
                <option value="6">Mouse</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBrand">
              <Form.Label>Marca</Form.Label>
              <Form.Select
                name="id_brand"
                value={product.id_brand}
                onChange={handleInputChange}
              >
                <option>{product.id_brand}</option>
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
                <option value="13">XIAOMI</option>
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