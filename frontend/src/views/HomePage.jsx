import React, { useContext, useEffect } from "react";
import Banner from "../components/BannerHomePage.jsx";
import Footerlam from "../components/Footerlam.jsx";
import Transition from "../components/TransitionHomePage.jsx";
import Cards from "../components/CardHomePage.jsx";
import { signupAuthGoogle } from "../components/services/signupAuthGoogle.js";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext.jsx";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  const {
    inicioDeSesionUsuarioGoogle,
  } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      const newUser = {
        name: user.given_name,
        rut: user.given_name, // ESTO VA A CAMBIAR SE DEBE PLANTEAR OTRA SOLUCION
        email: user.email,
        password: user.sub, // ESTO VA A CAMBIAR SE DEBE PLANTEAR OTRA SOLUCION
        address: user.given_name, // ESTO VA A CAMBIAR SE DEBE PLANTEAR OTRA SOLUCION
        url_icons: user.picture,
      };
console.log(user)
      console.log(newUser);
      inicioDeSesionUsuarioGoogle(newUser);
/* 
      inicioDeSesionUsuarioGoogle(user.email, user.sub); */
    } else {
      console.log("sin autenticacion");
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <Banner />
      <Transition />
      <Cards
        isHomePage={false} /* aqui no se van a ver los filtros */
        isFilterDescrip={false}
        isFilterBrand={false} /* columnClass="row-cols-md-3" */
        numCards={9}
      />
      <Footerlam />
    </>
  );
};

export default HomePage;