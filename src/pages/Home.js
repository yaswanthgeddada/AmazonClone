import React from "react";
import Topbar from "../components/Topbar";
import ProductsCard from "../components/ProductsCard";
import ProductsSlide from "../components/ProductsSlide";
import Bottombar from "../components/Bottombar";

import { categories } from "../data/categoriesDummyData";

const Home = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b overflow-x-hidden from-blue-500 bg-cover">
      <div className="h-10 flex-grow-0 w-screen mb-4">
        <Topbar AddressLline1="yaswanth" AddressLline2="valluru mainroad" />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-7 mx-10 mt-10 ">
        {categories.map((group) => (
          <div>
            <ProductsCard
              title={group.title}
              image1={group.images1.url}
              groupname1={group.images1.title}
              image2={group.images2.url}
              groupname2={group.images2.title}
              image3={group.images3.url}
              groupname3={group.images3.title}
              image4={group.images4.url}
              groupname4={group.images4.title}
            />
          </div>
        ))}
      </div>
      <div className="mt-20">
        <ProductsSlide />
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-7 mx-10 mt-10 ">
        {categories.map((group) => (
          <div>
            <ProductsCard
              title={group.title}
              image1={group.images1.url}
              groupname1={group.images1.title}
              image2={group.images2.url}
              groupname2={group.images2.title}
              image3={group.images3.url}
              groupname3={group.images3.title}
              image4={group.images4.url}
              groupname4={group.images4.title}
            />
          </div>
        ))}
      </div>
      <Bottombar />
    </div>
  );
};

export default Home;
