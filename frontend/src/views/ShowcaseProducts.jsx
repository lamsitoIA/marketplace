import React from "react";
import Allproducts from "../components/Allproducts.jsx";
import Footerlam from "../components/Footerlam.jsx";        

const ShowcaseProducts = () => {
  return (
    <div>
      <Allproducts /* isHomePage={true} isFilterDescrip={true} */ /* columnClass="row-cols-md-3" */ /* numCards={4} */ />
      <Footerlam />
    </div>
  );
};

export default ShowcaseProducts;

