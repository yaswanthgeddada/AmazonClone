import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import SingleProductCard from "./../components/SingleProductCard";
import { LinearProgress } from "@material-ui/core";

import {
  appNewProduct,
  addImageToStorageBucket,
  getAllProducts,
} from "../firebase/productService";
import OrdersForSeller from "./../components/OrdersForSeller";

const ProductsManagement = () => {
  const userId = useParams().userId;
  const [content, setContent] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [products, setProducts] = useState(false);

  const productTitle = useRef();
  const category = useRef();
  const price = useRef();
  const description = useRef();

  console.log(userId);

  const getAllProductsFromDb = async () => {
    const products = await getAllProducts();
    setProducts(products);
    setContent("myProducts");
    console.log("all products :", products);
  };

  useEffect(() => {
    console.clear();
    getAllProductsFromDb();
  }, []);

  const addProductImage = async (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      let image = e.target.files[0];

      try {
        await addImageToStorageBucket(
          image,
          setIsLoading,
          setProgress,
          setImageUrl,
          "productImages"
        );
        console.log(progress);
        console.log(imageUrl);
      } catch (error) {
        console.log(setError(error.message));
      }
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      productTitle.current.value !== "" &&
      category.current.value !== "" &&
      price.current.value !== "" &&
      description.current.value !== ""
    ) {
      setError("");
      setSubmit(true);
      let obj = {
        sellerId: userId,
        title: productTitle.current.value,
        category: category.current.value,
        price: price.current.value,
        description: description.current.value,
        imageUrl: imageUrl,
        reviews: [],
        rating: 5,
      };
      console.log(obj);

      try {
        await appNewProduct(obj);
        setSubmit(false);
        getAllProductsFromDb();
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("All fields are required");
    }
  };

  const addProductTab = () => {
    return (
      <form action="">
        <div className="flex flex-col w-2/5 mx-auto mt-20 space-y-2">
          {error && (
            <div className="border border-red-400 rounded-lg py-1 text-red-500">
              {error}
            </div>
          )}
          <input type="text" placeholder="product title" ref={productTitle} />
          <input type="text" placeholder="category" ref={category} />
          <input type="text" placeholder="price" ref={price} />
          <textarea type="text" placeholder="description" ref={description} />

          <input
            type="file"
            placeholder="image"
            accept="image/.jpg, image/.jpeg, image/.png "
            onChange={addProductImage}
          />
          {isLoading && (
            <div className="my-2">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          )}

          <div className="flex justify-end">
            <button className="bg-gradient-to-t from-red-400 to-yellow-100 rounded-lg  py-1 px-10">
              cancle
            </button>
            <button
              disabled={isLoading || submit}
              type="submit"
              onClick={handleAddProduct}
              className="bg-gradient-to-t from-yellow-400 to-yellow-100 rounded-lg  py-1 px-10 mx-2"
            >
              add
            </button>
          </div>
        </div>
      </form>
    );
  };

  const myProductsTab = () => {
    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-1 md:gap-20 sm:gap-5  px-10">
        {products.map((p) => (
          <div className="mt-10 " key={p?.productId}>
            <SingleProductCard
              productImage={p?.imageUrl}
              rating={p?.rating}
              price={p?.price}
              title={p?.title}
              productId={p?.productId}
            />
          </div>
        ))}
      </div>
    );
  };

  const tabContent = () => {
    if (content === "myProducts") {
      return myProductsTab();
    }

    if (content === "addProduct") {
      return addProductTab();
    }

    if (content === "ordersBycustomers") {
      return <OrdersForSeller />;
    }

    return;
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-gray-400 ">
      <div className="text-3xl text-center text-white font-bold drop-shadow ">
        Manage your products
      </div>
      <div className="mx-32 mt-3 bg-white h-full overflow-x-hidden ">
        <div className="sticky top-0 h-10 bg-gray-600 flex items-center w-full z-20 ">
          <div
            className="text-white mx-2 cursor-pointer"
            onClick={() => setContent("addProduct")}
          >
            Add products
          </div>
          <div
            className="text-white mx-2 cursor-pointer"
            onClick={() => setContent("myProducts")}
          >
            My Products
          </div>
          <div className="text-white mx-2">Search Products</div>
          <div
            className="text-white mx-2 cursor-pointer"
            onClick={() => setContent("ordersBycustomers")}
          >
            Orders
          </div>
        </div>
        <div>{tabContent()}</div>
      </div>
    </div>
  );
};

export default ProductsManagement;
