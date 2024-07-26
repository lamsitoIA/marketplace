import { Link } from "react-router-dom";
import cubos from "../../src/assets/image/cubos.png";
import cubosLoggedIn from "../../src/assets/image/cubosLoggedIn.png";
import { useAuth0 } from "@auth0/auth0-react";
import "./Navigation.css";
import { useContext, useState ,useEffect } from "react";
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
import "../components/Cart.css";
//import { getCartAll } from "./services/getCartAll";//solicitud al servidor para obtener los datos del carrito de compras
//import { Link } from 'react-router-dom'; 
//import { Nav } from 'react-bootstrap'; 
//import {cartAdd} from "../components/services/cartAdd"

const Navigation = () => {
 
  const { username, userId } = useContext(UserContext);
  const { isAuthenticated, user, logout } = useAuth0();
  //console.log("cartproducts de navigation",cartproducts)
  const [cartQuantity, setCartQuantity] = useState(0); // Estado para la cantidad de productos
  const { cartproducts, getMyCart, cartproduct } = useContext(CartContext);
  useEffect(() => {
      getMyCart(userId)
  
    },[cartproduct, username ]);
//const [cartTotal, setCartTotal] = useState(0);
/* onst CartTotalValue = async () => {
  try {
    const cartData = await getCartAll(userId);//solicitud al servidor para obtener los productos del carrito por un usuario en especifico
    //const cartData = await getMyCart(userId);
    const totalValue = Object.values(cartproducts).reduce((total, current) => {//productsCart, viene de la respuesta del controlador
      //reduce() es un método de array en JavaScript que permite iterar sobre los elementos del array y acumular un valor.
      //Object.values() es un método de JavaScript que devuelve un array con los valores de las propiedades de un objeto.
      return total + ((current.quantity) * (current.price));//parseFloat por si acaso es un string y convertirlo a numero, pero no es necesario
    }, 0);
    setCartTotal(totalValue);//se actualiza el valor de cartTotal
    console.log("cartTotal de navigation",cartTotal)
    return totalValue;
  } catch (error) {
    console.error('Error al obtener los datos del carrito:', error);
    setCartTotal(0);
    return 0;
  }
}; */


//console.log("valor de CartTotalValue: " + typeof CartTotalValue())

  //const userId = isAuthenticated && user ? user.sub : localUserId;

  const calculateCartQuantity = () => {
    // Calcular la cantidad total de productos
    const totalQuantity = Object.values(cartproducts).reduce((total, current) => {
        return total + current.quantity;
    }, 0);
    setCartQuantity(totalQuantity); // Actualizar el estado de cantidad
};

useEffect(() => {
    calculateCartQuantity(); // Llamar a la función para calcular la cantidad
}, [cartproducts]);
console.log(user);
console.log("isAuthenticated", isAuthenticated) 
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
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to={`/profile/${userId}`}>
                 {/*  AQUIIIII 
                 
                 
                 
                 
                 */}
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

                
                <Nav.Link as={Link} to={`/cart/${userId}`} className="cart-container">
    <div className="cart-icon-container">
        <FaCartPlus title="Carrito de Compra" className="cart-icon" />
        <span className="cart-quantity">{cartQuantity}</span>
    </div>
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

export default Navigation
