import React from "react";
import SingleProductCard from "./SingleProductCard";

import { toysData } from "../data/toysDummydata";

const ProductsSlide = () => {
  return (
    <div className="bg-gray-100 mx-10 shadow-lg h-96 rounded mb-20 pt-4 px-4">
      <div className="text-lg">Trending Toys for your family</div>
      <div className="flex overflow-x-scroll">
        {toysData.map((toy) => (
          <SingleProductCard
            productImage={toy.ProductImage}
            rating={toy.rating}
            price={toy.price}
            title={toy.ProductTitle}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSlide;
