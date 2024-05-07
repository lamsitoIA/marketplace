import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'; // Importa los iconos de FontAwesome
import "../components/Footerlam.css";


const Footerlam = () => {
  const iconColor = "#555";

  return (
    <footer className="bg-dark text-light py-4">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h5>Información de Contacto</h5>
            <p>Dirección: 123 Calle Principal, Santiago</p>
            <p>Teléfono: (123) 456-7890</p>
            <p>Email: contcato@lam.com</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <h5>¡Síguenos en nuestras redes sociales!</h5>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook
                  className="social-icon"
                  style={{ fontSize: "3em", color: iconColor, marginRight: "20px" }}
                />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram
                  className="social-icon"
                  style={{ fontSize: "3em", color: iconColor, marginRight: "20px" }}
                />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube
                  className="social-icon"
                  style={{ fontSize: "3em", color: iconColor }}
                />
              </a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light w-100 my-4" />
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            © 2024 Latin American Market.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footerlam;