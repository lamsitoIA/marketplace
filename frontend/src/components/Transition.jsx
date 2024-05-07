import React from "react";
import { Card, Button, Container, Badge } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Transition = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth_user");
  };

  return (
    <Container>
      <Card className="my-5">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            ¡Descubre un mundo de oportunidades únicas!
          </Card.Title>
          <Card.Text className="text-center mb-4">
            Te extendemos una cordial invitación a registrarte en nuestro sitio
            web. Al hacerlo, tendrás acceso a las mejores ofertas y a productos
            exclusivos que no querrás perderte.
          </Card.Text>
          <div className="text-center">
            <Button
              variant="outline-dark"
              className="m-1"
              onClick={handleClick}
            >
              ¡Registrarme Ahora!
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Transition;
