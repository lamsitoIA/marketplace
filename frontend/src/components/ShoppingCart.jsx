import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCartAll } from './services/getCartAll';
import { ProductContext } from '../context/ProductContext';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
const ShoppingCart = () => {
  const { userId } = useParams();
  const {products} = useContext(ProductContext)
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getCartAll(userId);
        setCartProducts(cartData.productsCart);

        const totalValue = Object.values(cartData.productsCart).reduce((total, current) => {
          return total + (parseFloat(current.quantity) * parseFloat(current.price));
        }, 0);
        setCartTotal(totalValue);
      } catch (error) {
        console.error('Error al obtener los datos del carrito:', error);
        setCartTotal(0);
      }
    };

    fetchCartData();
  }, [userId]);

  const decrement = (productId) => {
    // Busca el producto en cartProducts por su id
    const productIndex = cartProducts.findIndex(product => product.id === productId);
    
    if (productIndex !== -1) {//Esto significa que se encontró el producto en el array
      // Crea una copia del array cartProducts para evitar modificar directamente el estado original.cartProducts
      const updatedCartProducts = [...cartProducts];
      
      // Se decrementa la cantidad del producto en la matriz utilizando el índice . Esto reduce la cantidad del producto en 1
      updatedCartProducts[productIndex].quantity--;
      
      // Actualiza el estado de cartProducts con el nuevo array
      setCartProducts(updatedCartProducts);
      
      // Recalcula el total del carrito
      const totalValue = updatedCartProducts.reduce((total, current) => {
        return total + (parseFloat(current.quantity) * parseFloat(current.price));
      }, 0);
      setCartTotal(totalValue);
    }
  };

  const increment = (productId) => {
    // Busca el producto en cartProducts por su id
    const productIndex = cartProducts.findIndex(product => product.id === productId);
    
    if (productIndex !== -1) {
      // Crea una copia del array cartProducts
      const updatedCartProducts = [...cartProducts];
      
      // Incrementa la cantidad del producto
      updatedCartProducts[productIndex].quantity++;
      
      // Actualiza el estado de cartProducts con el nuevo array
      setCartProducts(updatedCartProducts);
      
      // Recalcula el total del carrito
      const totalValue = updatedCartProducts.reduce((total, current) => {
        return total + (parseFloat(current.quantity) * parseFloat(current.price));
      }, 0);
      setCartTotal(totalValue);
    }
  };
console.log("cartTotal desde ShoppingCart", cartTotal )
  return (
    <Container>
  <Row className="justify-content-center my-5">
    <Col xs={12} md={8}>
      <h4 className="text-center mb-4">Detalles del pedido:</h4>
    </Col>
  </Row>
  <Row className="justify-content-center">
    {cartProducts.map((cart, k) => (
      <Col key={k} xs={12} md={4} className="mb-4">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={cart.url_image} />
          <Card.Body>
            <Card.Title>{cart.name}</Card.Title>
            <Card.Text>
              <h4>{cart.price * (cart.quantity || 1)}</h4>
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button variant="dark" onClick={() => decrement(cart.id)}>
                Menos -
              </Button>
              <h4 style={{ margin: '0 10px' }}>{cart.quantity || 1}</h4>
              <Button variant="dark" onClick={() => increment(cart.id)}>
                Mas +
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  <Row className="justify-content-center my-5">
    <Col xs={12} md={8}>
      <div className="d-flex justify-content-between align-items-center">
        <h4 id="subtotal">Total: {cartTotal.toFixed(2)}</h4>
        <Button variant="dark">Ir A Pagar</Button>
      </div>
    </Col>
  </Row>
</Container>

  );
};

export default ShoppingCart;
