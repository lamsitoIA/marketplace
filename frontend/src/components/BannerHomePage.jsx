import React from "react";
import { Carousel, Button } from "react-bootstrap";
import aPic from "../assets/image/lam-home.png";
import bPic from "../assets/image/sharge-disk-home.png";
import cPic from "../assets/image/smart-watch-home.png";
import dPic from "../assets/image/smart-speaker-home.png";
import "../components/BannerHomePage.css";
import { Link } from "react-router-dom";

const BannerHomePage = () => {
  return (
    <div>
      <Carousel data-bs-theme="dark" slide interval={10000} >
        <Carousel.Item>
          <img className="d-flex w-100" src={aPic} alt="first Image" />
          <Carousel.Caption>
            <div className="divgotoproductusbutton">
              <Link to="/allproducts">
                <Button variant="outline-light" className="gotoproductusbutton">
                  Ir a Productos
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-flex w-100" src={bPic} alt="second Image" />
          <Carousel.Caption>
          <Link to="/allproducts"  className="linkText">
              <h3 >SHARGE Disk</h3>
              <Button href="/allproducts"variant="outline-dark">Navegar por productos</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-flex w-100" src={cPic} alt="third Image" />
          <Carousel.Caption>
          <Link to="/allproducts"  className="linkText">
            <h3>SmartWatch</h3>
            <Button href="/allproducts" variant="outline-dark">Descubrir productos</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-flex w-100" src={dPic} alt="quart Image" />
          <Carousel.Caption>
          <Link to="/allproducts"  className="linkText">
            <h3>SmartSpeaker</h3>
            <Button href="/allproducts" variant="outline-dark">Explorar catálogo</Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default BannerHomePage;
