import React, { useState, useEffect } from "react";
import { Container, Card, Button, Badge, Stack } from "react-bootstrap";
import addproductimg from "../assets/image/addproduct.png"

const PreviewProduct = ({ name, description, price, url_image, username, state, quantity  }) => {
  const [image, setImage] = useState(addproductimg);

  useEffect(() => {
    if (url_image) {
      setImage(url_image);
    }
  }, [url_image]);


  return (
    <Container className=" align-items-center d-flex justify-content-center pt-4 ">
      <Card className="photo w-50 p-3  center-block " style={{ width: "16rem" }} >
        <Card.Img
          variant="top"
          src={image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt={name}
        />
        <Card.Body>
          <Card.Title class="display-4" > {name}</Card.Title>
          <Card.Text class="display-8" >{description}</Card.Text>
          <Card.Text>{price}</Card.Text>
        </Card.Body>

        <Stack  gap={1}>
              <Button variant="dark">
                Estado: <Badge bg="secondary">{state}</Badge>
                <span className="visually-hidden">unread messages</span>
              </Button>
              
              <Button variant="dark">
                Stock:{" "}
                <Badge bg="secondary"> {quantity}</Badge>
              </Button>
              <Button variant="dark">
                Vendedor{" "}
                <Badge bg="secondary"> {username}</Badge>
              </Button>
            </Stack>

        <Card.Footer>
          <small className="text-muted">Publicada por {username}</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PreviewProduct