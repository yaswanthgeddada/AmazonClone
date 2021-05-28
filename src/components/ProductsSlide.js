import React from "react";
import SingleProductCard from "./SingleProductCard";

const ProductsSlide = ({ data, slideTitle }) => {
  return (
    <div className="bg-gray-100 mx-10 shadow-lg  rounded mb-20 pt-4 px-4">
      <div className="text-lg">
        {slideTitle || "Trending top picks for you :"}
      </div>
      <div className="flex p-4 overflow-x-scroll">
        {data?.map((toy) => (
          <SingleProductCard
            key={toy.title}
            productImage={toy.imageUrl}
            rating={toy.rating}
            price={toy.price}
            title={toy.title}
            productId={toy?.productId}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSlide;
