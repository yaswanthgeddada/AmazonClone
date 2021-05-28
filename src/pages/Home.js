import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import ProductsCard from "../components/ProductsCard";
import ProductsSlide from "../components/ProductsSlide";
import Bottombar from "../components/Bottombar";

import { categories } from "../data/categoriesDummyData";
import { getProductByCategory } from "../firebase/productService";

const Home = () => {
  const [toys, setToys] = useState();
  const [electronics, setElectronics] = useState();

  const getProductsWithCategory = async () => {
    const toysProducts = await getProductByCategory("toys");
    console.log("toys : ", toysProducts);
    setToys(toysProducts);

    const electronicsProducts = await getProductByCategory("electronics");
    console.log("electronics :", electronicsProducts);
    setElectronics(electronicsProducts);
  };

  useEffect(() => {
    getProductsWithCategory();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-b overflow-x-hidden from-blue-500 bg-cover">
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-7 mx-10 mt-10 ">
        {categories.map((group) => (
          <div key={group.title}>
            <ProductsCard
              category={group.category}
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
        {toys && (
          <ProductsSlide
            data={toys}
            slideTitle="Trending top toys for kids & adults"
          />
        )}
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-7 mx-10 mt-10 ">
        {categories.map((group) => (
          <div key={group.title}>
            <ProductsCard
              category={group.category}
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
        {toys && (
          <ProductsSlide
            data={electronics}
            slideTitle="Trending electronic Devices"
          />
        )}
      </div>

      <div className="mt-20">
        <Bottombar />
      </div>
    </div>
  );
};

export default Home;
