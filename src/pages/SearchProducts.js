import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getProductByCategory,
  getAllProducts,
} from "../firebase/productService";
import Topbar from "../components/Topbar";
import SingleProductCard from "../components/SingleProductCard";

const SearchProducts = () => {
  const searchTerm = useParams().searchTerm;
  const [products, setProducts] = useState();

  const getAllProductsOnCatrgoty = async () => {
    const result = await getProductByCategory(searchTerm);
    setProducts(result);
  };

  const getAllProds = async () => {
    const result = await getAllProducts();
    setProducts(result);
  };

  useEffect(() => {
    if (searchTerm) {
      getAllProductsOnCatrgoty();
    } else {
      getAllProds();
    }
  }, [searchTerm]);

  console.log(products);

  return (
    <div className="bg-gradient-to-b  h-full from-blue-300 to-gray-100">
      <div className="text-xl mx-10">
        All the Trending Products on{" "}
        <i className="text-red-400 font-semibold">{searchTerm}</i> :{" "}
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

export default SearchProducts;
