import React, { useState, useRef } from "react";
import Topbar from "../components/Topbar";
import StarRatings from "react-star-ratings";
import AddtoCartCard from "../components/AddtoCartCard";
import { useEffect } from "react";
import ReviewCard from "../components/ReviewCard";
// import AddNewReview from "../components/AddNewReview";
import { useParams } from "react-router";
import { getProductById, addProductToCart } from "../firebase/productService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Product = () => {
  const { currentUser } = useAuth();
  const { cartItemsLength, setCartItemsLength } = useCart();
  const productId = useParams().id;
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const quantity = useRef();

  useEffect(() => {
    console.clear();
    const getProduct = async () => {
      const result = await getProductById(productId);
      console.log(result);
      setProduct(result);
    };

    getProduct();
  }, [productId]);

  const addItemToCart = async () => {
    setIsLoading(true);
    const userId = currentUser.uid;

    await addProductToCart(product, userId, quantity.current.value);
    setIsLoading(false);
    setCartItemsLength(cartItemsLength + 1);
  };

  return (
    <div>
      {product ? (
        <div className="flex mt-20 h-full">
          {/* image */}
          <div className="px-10 w-2/5">
            <img
              src={product?.imageUrl || "/assets/products/phones/oppoa74.jpg"}
              className="w-96"
              alt=""
            />
          </div>

          {/* product details section */}
          <div className="flex flex-col w-2/5 ">
            <div className="text-lg my-2">{product?.title}</div>
            <div className="mb-2">
              <StarRatings
                rating={product?.rating}
                starDimension="20px"
                starSpacing="0px"
                starRatedColor="#fb0"
              />
            </div>
            <hr />
            <div className="my-2">
              <p>
                M.R.P: <span>₹ {product?.price}</span>
              </p>

              <p>Inclusive of all taxes</p>
            </div>
            <hr />
            <div className="my-2">
              <p>In stock on May 28, 2021.</p>
              <p>Order it now.</p>
            </div>

            {/* seller */}
            <div>
              Sold by Appario Retail Private Ltd and Fulfilled by Amazon.
            </div>

            {/* product specs */}
            <div className="break-words my-3">
              <hr />
              <p className="font-bold">About this item</p>
              <p>{product?.description}</p>
            </div>
          </div>

          {/* add to cart part */}
          <div className="mr-40 ml-20 w-96">
            <AddtoCartCard
              addItemToCart={addItemToCart}
              isLoading={isLoading}
              quantity={quantity}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <br />
      <hr />

      <div className="my-20  mx-56 ">
        {/* <AddNewReview /> */}
        <ReviewCard />
      </div>
    </div>
  );
};

export default Product;
