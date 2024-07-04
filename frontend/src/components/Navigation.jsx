import { Link } from "react-router-dom";
import cubos from "../../src/assets/image/cubos.png";
import cubosLoggedIn from "../../src/assets/image/cubosLoggedIn.png";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navigation.css";
import { useContext, useState/* ,useEffect */ } from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import {
  FaArrowRightFromBracket,
  FaUserLarge,
  FaGlobe,
  FaCirclePlus,
  FaHeartCircleCheck,
  FaCartPlus,
} from "react-icons/fa6";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/cartContext";
import { getCartAll } from "./services/getCartAll";
//import { Link } from 'react-router-dom'; 
//import { Nav } from 'react-bootstrap'; 
//import {cartAdd} from "../components/services/cartAdd"

const Navigation = () => {
  //const [totalValue/* , setTotalValue */] = useState(0)
  //const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
  const { username, userId } = useContext(UserContext);
  const { isAuthenticated, user, logout } = useAuth0();
  const { cartproducts } = useContext(CartContext);
  console.log("cartproducts de navigation",cartproducts)
  

const [cartTotal, setCartTotal] = useState(0);

const CartTotalValue = async () => {
  try {
    const cartData = await getCartAll(userId);
    const totalValue = Object.values(cartData.productsCart).reduce((total, current) => {
      return total + (parseFloat(current.quantity) * parseFloat(current.price));
    }, 0);
    setCartTotal(totalValue);
    return totalValue;
  } catch (error) {
    console.error('Error al obtener los datos del carrito:', error);
    setCartTotal(0);
    return 0;
  }
};

 
console.log("valor de CartTotalValue: " + typeof CartTotalValue())

  //const userId = isAuthenticated && user ? user.sub : localUserId;
console.log(user);
  let imageToShow;
  if (userId === null) {
    imageToShow = cubos;
  } else {
    imageToShow = cubosLoggedIn;
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarLam " bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image
              className="cubos1"
              src={imageToShow}
              alt="cubos"
              roundedCircle
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle  aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto " >
            {isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/allproducts"
                  title="Todos los Productos"
                >
                  <FaGlobe />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/addproduct"
                  title="Hacer una nueva Publicación"
                >
                  <FaCirclePlus />
                </Nav.Link>

                <Nav.Link as={Link} to={`/profile/${user.sub}`} title="Mi Perfil">
                  <FaUserLarge />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  onClick={() => logout({ returnTo: "/" })}
                  title="Salir"
                >
                  <FaArrowRightFromBracket />
                </Nav.Link>
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={`/profile/${user.sub}`}>
                    <FaUserLarge /> Mi perfil
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to={`/favorite/${user.sub}`}>
                    <FaHeartCircleCheck /> Mis Favoritos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/addproduct">
                    <FaCirclePlus /> Publicar Producto
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/allproducts">
                    <FaGlobe /> Todos los Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                 
                  <NavDropdown.Item
                    as={Link}
                    onClick={() => logout({ returnTo: "/" })}
                    title="Salir"
                  >
                    <FaArrowRightFromBracket
                      style={{color: "black" }}
                    />{""} Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>

              
            ) : username ? (
              <>
              
                <Nav.Link
                  as={Link}
                  to="/allproducts"
                  title="Todos los Productos"
                >
                  <FaGlobe />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/addproduct"
                  title="Hacer una nueva Publicación"
                >
                  <FaCirclePlus />
                </Nav.Link>

                <Nav.Link as={Link} to={`/profile/${userId}`} title="Mi Perfil">
                  <FaUserLarge />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  onClick={() => logout({ returnTo: "/" })}
                  title="Salir"
                >
                  <FaArrowRightFromBracket />
                </Nav.Link>
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={`/profile/${userId}`}>
                    <FaUserLarge /> Mi perfil
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to={`/favorite/${userId}`}>
                    <FaHeartCircleCheck /> Mis Favoritos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/addproduct">
                    <FaCirclePlus /> Publicar Producto
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/allproducts">
                    <FaGlobe /> Todos los Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                 
                  <NavDropdown.Item
                    as={Link}
                    onClick={() => logout({ returnTo: "/" })}
                    title="Salir"
                  >
                    <FaArrowRightFromBracket
                      style={{color: "black" }}
                    />{""} Cerrar sesión
                  </NavDropdown.Item>
                  
                </NavDropdown>

                <Nav.Link>
                  <FaCartPlus  title="Carrito de Compra"/>
                  <span id="total" className="m-4">${cartTotal}</span>
                </Nav.Link>
            {/* <Nav.Link as={Link} to={`/cart/${user.sub}`}>
                  <FaCartPlus title="Carrito de Compra" />
                  <span id="total" className="m-4">${cartTotal}</span>
                </Nav.Link>*/}
              </>
            ) : (
              <>
        <Navbar.Collapse>
                <Nav.Link as={Link} to="/auth_user">
                  Iniciar sesión
                </Nav.Link>

                <Nav.Link as={Link} to="/users">
                  Registrar
                </Nav.Link>
                </Navbar.Collapse>
              
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
