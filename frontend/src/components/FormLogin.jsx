import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Container,
  Image,
  Button,
  Form,
  Row,
  Col,
  Stack,
  Spinner,
} from "react-bootstrap";
import google_aut from "../../src/assets/image/google_aut.png";
import "./FormLogin.css";
import { useContext, useState } from "react";
import { login } from "../components/services/loginService.js";
import { UserContext } from "../context/UserContext.jsx";
import mundo_cubo_copia from "../../src/assets/image/mundo_cubo-copia.png";

const FormLogin = () => {
  const { setUserId, setUsername, setUrlIcons } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    /* Aqui si la clave es igual al valor entonces no es necesario que sea email : email , puede ser solo email. */
    if(!email || !password){
      setError("los campos no pueden estar vacios")
    }
    const userLogin = {
      user: {
        email: email,
        password: password,
      },
    };

    try {
      const response = await login(userLogin);
      if (!response || response.code !== 200) { // !response quiere decir que no viene nada en el cuerpo que viene vacio y response.code !== 200 estamos diciendo que si el codigo es diferente a 200
        throw new Error(response ? response.error : "Unexpected error"); // aca lanzamos un error y decimos si response  es true es verdadero, entonces tirame el error capturado que envia el servidor y si response es false osea response no tiene nada entonces lanzamae unexpected error
      }           //si el error se captura en esponse.error entonces se va directo al catch a las validaciones.
      setUserId(response.id_user);
      setUsername(response.name);
      setUrlIcons(response.url_icons);
      localStorage.setItem("token", response.token);
      navigate(`/profile/${response.id_user}`);
    } catch (error) {
      const errorMessage = error.message
      if (errorMessage === "None of the Fields can be empty") {
        setError("Los campos no pueden estar vacíos");
      } else if (errorMessage === "Username does not exist" || errorMessage === "Invalid password") {
        setError("Correo o contraseña incorrecta");
      } else {
        setError("Error inesperado, por favor intente de nuevo");
      }
    } finally {
      setIsLoading(false); //el finally basicamente es para que el codigo no siga vagabundeando por decirlo asi, en caso de que no se cumpla nada.
    }
  };

  return (
    <>
      <Container className="m-3 p-2 ">
        <Row>
          <Col sm className="d-flex justify-content-center">
            <Image
              src={mundo_cubo_copia}
              alt="mundo_cubos"
              className="img_lg"
            />
          </Col>

          <Col sm className="d-flex flex-column align-items-center mt-5 pt-5">
            <h3 class="display-3">¡Hola! </h3>
            <h4 class="display-4">Bienvenido </h4>
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
              onSubmit={handleLogin}
              className="justify-content-center vertical_line"
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3  " controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
              ></Form.Group>

              <Stack direction="horizontal">
                <Button
                  className="rounded-button w-75  m-3"
                  variant="dark"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Iniciar"
                  )}
                </Button>
                <Button
                  className="rounded-button w-75 m-3"
                  variant="dark"
                  type="submit"
                  onClick={() => {
                    navigate(`/users`);
                  }}
                >
                  Registrar
                </Button>
              </Stack>
              {error && ( // Renderiza el mensaje de error si existe
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

export default FormLogin;
