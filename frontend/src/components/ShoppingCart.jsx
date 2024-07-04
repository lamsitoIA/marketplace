import React from 'react'
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { Card, Button, Row, Col } from 'react-bootstrap';

const ShoppingCart = () => {
  
    const location = useLocation();
  const { cartproducts } = useContext(CartContext);
  //const {userId} = useParams();

  // Obtener el total del carrito desde props.location.state
  const { cartTotal } = location.state || {};

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {cartproducts.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Marca: {product.brand}
                  <br />
                  Estado: {product.status}
                  <br />
                  Precio: ${product.price.toFixed(2)}
                  <br />
                  Cantidad: {product.quantity}
                  {/* <br />
                  Vendedor: {product.userId} */}
                </Card.Text>
                <Button variant="primary">Eliminar del carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {cartTotal !== undefined && (
        <p>Total del carrito: ${cartTotal.toFixed(2)}</p>
      )}
    </div>
  );
};
  


export default ShoppingCart