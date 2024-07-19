import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
/* import "react-toastify/dist/ReactToastify.css" */
import { ProductProvider } from "./context/ProductContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>
          <CartProvider>
           {/* <StoreProvider> */}
            <Auth0Provider
              domain="dev-iw8elxagxdwxybue.us.auth0.com" /* domain y clientid tienen que estar en .env y luego pasarlo aca */ /* dev-iw8elxagxdwxybue.us.auth0.com   deployment */   /* dev-skbt4lrbmrsq7v5k.us.auth0.com */
              clientId="hT268YQQlQ1LN93RM3qbCv4pR0ES8rr1" /* hT268YQQlQ1LN93RM3qbCv4pR0ES8rr1   deployment */   /* T0JnePBH2Ynxd1bfgNiH2Jk4MkFdOzz6 */
              authorizationParams={{
                redirect_uri: window.location.origin
              }}
            >
              <App />
            </Auth0Provider>
           {/* </StoreProvider> */}
          </CartProvider>
        </UserProvider> 
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);


