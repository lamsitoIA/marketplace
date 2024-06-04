import React, { useContext, useState } from "react";
import mundo_cubo_copia from "../../src/assets/image/mundo_cubo-copia.png";
import {
  Container,
  Image,
  Button,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import google_aut from "../../src/assets/image/google_aut.png";
import "./FormLogin.css";
import { signup } from "./services/signup.js";
import { UserContext } from "../context/UserContext";

const FormRegister = () => {
  /* const { users, setUsers } = useContext(UserContext); */
  const [name, setName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [url_icons, setUrlIcons] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const iconOptions = [
    "https://cdn.icon-icons.com/icons2/1465/PNG/512/154manofficeworker2_100459.png",
    "https://cdn.icon-icons.com/icons2/1465/PNG/512/156womanofficeworker2_100687.png",
  ];

  const handleIconClick = (url) => {
    setUrlIcons(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación de campos
    if (!name || !rut || !email || !password || !address || !url_icons) {
      setError("Todos los campos son obligatorios. ");
      setIsLoading(false);
      return;
    }

    // Agregar nuevo usuario
    const newUser = {
      user: {
        name,
        rut,
        email,
        password,
        address,
        url_icons,
      },
    };


    try {
      const response = await signup(newUser);
      if (response.userCreated) {
        setTimeout(() => {
          navigate(`/auth_user`, {
            state: { userName: response.name },
          });
        }, 150);
      } else {
        if(response.error === "Has a unique constraint and cannot be repeated in the database"){
          setError('Rut o Correo ya existente, intente nuevamente');
          setIsLoading(false);
        }else{
          setError('Ocurrió un error, intente nuevamente');
          setIsLoading(false);
        }
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container className="m-3 p-2">
        {/* <Container className={`m-3 p-2 ${isLoading ? "loading-cursor" : ""}`}> PENDIENTE DE SOLUCIONAR MENTENER IDEA  */}
        <Row>
          <Col sm className="d-flex justify-content-center">
            <Image
              src={mundo_cubo_copia}
              alt="mundo_cubos"
              className="img_lg"
            />
          </Col>
          <Col sm className="d-flex flex-column align-items-center mt-5 pt-5">
            <h3 className="display-3">¡Hola! </h3>
            <h4 className="display-4">Bienvenido </h4>
            <Button
              className="auth_google rounded-button"
              variant="light"
              onClick={() =>
                loginWithRedirect({
                  screen_hint: "signup",
                  connection: "google-oauth2",
                })
              }
            >
              <img
                className="icons_google_aut "
                src={google_aut}
                alt="aut-google"
              />
              Iniciar con Google
            </Button>
          </Col>

          <Col sm className="d-flex align-items-center justify-content-center">
            <Form
              className="justify-content-center vertical_line"
              onSubmit={handleSubmit}
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicRut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter RUT"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Avatar</Form.Label>
                <div className="icon-selection">
                  {iconOptions.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="icon"
                      onClick={() => handleIconClick(url)}
                      style={{
                        border: url === url_icons ? "2px solid blue" : "none",
                        cursor: "pointer",
                        margin: "5px",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  ))}
                </div>
              </Form.Group>

              <Button
                className="boton rounded-button"
                variant="dark mt-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Registrar"
                )}
              </Button>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormRegister;
