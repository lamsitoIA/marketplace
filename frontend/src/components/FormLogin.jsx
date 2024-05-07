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
} from "react-bootstrap";
import google_aut from "../../src/assets/image/google_aut.png";
import "./FormLogin.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { login } from "../components/services/loginService.js";
import { UserContext } from "../context/UserContext.jsx";
import mundo_cubo_copia from "../../src/assets/image/mundo_cubo-copia.png";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const FormLogin = () => {
  const { setUserId, setUsername, setUrlIcons } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.warn(" 👀😢fields cannot be empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast.warn("😪 The email format is not correct", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

      return;
    }

    const userLogin = {
      user: {
        email: email,
        password: password,
      },
    };

    const user = login(userLogin)
      .then((response) => {
        if (!response.code && response.code != 200) {
          console.log("errorr");
          throw new Error(response.error);
        }
        console.log(" Respuesta ", response);
        setUserId(response.id_user);
        setUsername(response.name);
        setUrlIcons(response.url_icons);
        localStorage.setItem("token", response.token);
        console.log("token response: ", response.token)
        console.log("token: ", localStorage.getItem("token"))
        navigate(`/profile/${response.id_user}`, {
          state: { userName: response.name },
        });
      })
      .catch((error) => {
        toast.error("👀😢" + error, {
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
    console.log("user res", user);
    console.log("url icons:", setUrlIcons);
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
                >
                  Iniciar
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
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default FormLogin;
