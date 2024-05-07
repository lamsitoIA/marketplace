import { Link } from "react-router-dom";
import marketplaceImage from "../assets/image/notFound3.jpg"; // Ruta de la imagen del Marketplace

const NotFound = () => {
    return (
        <div className="notfound_container">
            <Link to="/" className="notfound_style">
                <img
                    src={marketplaceImage}
                    alt="Marketplace Image"
                    className="marketplace_image"
                    style={{ maxWidth: "100%", height: "auto", width: "100%", maxHeight: "100vh", objectFit: "contain" }}
                />
            </Link>
        </div>
    );
}

export default NotFound;