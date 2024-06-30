import { Link } from "react-router-dom";
import cubos from "../../src/assets/image/cubos.png";
import cubosLoggedIn from "../../src/assets/image/cubosLoggedIn.png";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navigation.css";
import { useContext/* , useState,useEffect */ } from "react";
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

//import {cartAdd} from "../components/services/cartAdd"

const Navigation = () => {
  //const [totalValue/* , setTotalValue */] = useState(0)
  const { username, userId } = useContext(UserContext);
  const { isAuthenticated, user, logout } = useAuth0();
  const { cart } = useContext(CartContext);
  console.log("cart de navigation",cart)
  /* const totalPrice = cart.reduce((total, product) => total + product.quantity * product.price, 0); */
 /*  let totalValue;

if (Array.isArray(cart)) {
    // cart is an array, you can use reduce
    totalValue = cart.reduce((total, current) => {
        const currentItemValue = current.price * current.quantity;
        return total + currentItemValue;
    }, 0.0);
} else {
    // cart is not an array, handle the error
    console.error("cart is not an array");
    totalValue = 0; // Set a default value for totalValue
}

// Now you can use totalValue outside the conditional statement
console.log("Total value:", totalValue);

 */
/* let totalValue;

if (Array.isArray(cart)) {
    // El carrito es una matriz, puedes usar reduc.
    totalValue = cart.reduce((total, current) => {
        const currentItemValue = current.price * current.quantity;
        return total + currentItemValue;
    }, 0.0);
} else if (typeof cart === 'object') {
    // El carrito es un objeto, manéjelo en consecuencia.
    console.error("cart is an object");
} else if (cart === null || cart === undefined) {
    // el carrito es nulo o no está definido, manéjelo en consecuencia
    console.error("cart is null or undefined");
    totalValue = 0; // Establecer un valor predeterminado para totalValue
} else {
    // El carrito es otra cosa, manéjelo en consecuencia.
    console.error("cart is not an array, object, null, or undefined");
    totalValue = 0; // Set a default value for totalValue
}

// Now you can use totalValue outside the conditional statement
console.log("Total value:", totalValue); */

/* const totalValue = Object.values(cart).reduce((total, current) => {
  return total + (current.quantity * current.price);

}, 0); */
/*  useEffect(() => {
  const cartData = getCartAll(userId);
  const NewtotalValue = Object.values(cartData).reduce((total, current) => {
    return total + (current.quantity * current.price);
  }, 0);
  setTotalValue(NewtotalValue);
}, [cart, setTotalValue, userId]); */ 

 const CartTotalValue = () => {
  const cartData = getCartAll(userId);
  const totalValue = Object.values(cartData).reduce((total, current) => {
    return total + (current.quantity * current.price);
  },0);
  return totalValue;
}; 
 
console.log("valor de totalValue: " + typeof totalValue)
  
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
                  <span id="total" className="m-4">${CartTotalValue}</span>
                </Nav.Link>
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
