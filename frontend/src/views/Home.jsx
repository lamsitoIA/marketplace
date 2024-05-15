import React from "react";
import Banner from "../components/BannerHomePage.jsx";
import Footerlam from "../components/Footerlam.jsx";
import Transition from "../components/Transition.jsx";
import CardsHome from "../components/HomePage.jsx";
/* import Navigation from "../components/Navigation.jsx" */

const Home = () => {
  return (
    <>
      <Banner />
      <Transition />
      <CardsHome
        isHomePage={false} /* aqui no se van a ver los filtros */
        isFilterDescrip={false}
        isFilterBrand={false} /* columnClass="row-cols-md-3" */
        /* numCards={9} */
      />
      <Footerlam />
    </>
  );
};

export default Home;
