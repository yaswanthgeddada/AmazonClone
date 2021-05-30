import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProductsOnSearch } from "../firebase/productService";
import SingleProductCard from "./../components/SingleProductCard";

const SearchForProductsTopBar = () => {
  const searchTerm = useParams().searchTerm;
  const [products, setProducts] = useState();

  console.log("searchTerm :", searchTerm);

  const getAllProdsForSearch = async () => {
    const result = await getAllProductsOnSearch(searchTerm);
    console.log("search :", result);
    setProducts(result);
  };

  useEffect(() => {
    getAllProdsForSearch();
  }, [searchTerm]);

  return (
    <div className="bg-gradient-to-b  h-full from-blue-300 to-gray-100">
      <div className="text-xl mx-10">
        Results for <span className="text-red-700">{searchTerm}</span> are :
        {/* <i className="text-red-400 font-semibold">{searchTerm}</i> :{" "} */}
      </div>
      <div className="grid grid-cols-4 gap-10 mx-20 pb-10 mt-5">
        {products &&
          products.map((p) => (
            <SingleProductCard
              key={p.title}
              productImage={p.imageUrl}
              rating={p.rating}
              price={p.price}
              title={p.title}
              productId={p?.productId}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchForProductsTopBar;
