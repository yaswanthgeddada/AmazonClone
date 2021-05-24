import React from "react";
import StarRatings from "react-star-ratings";

import "./scrollbar.css";

const SingleProductCard = (props) => {
  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-64  px-4 py-2 m-4">
      <div className="h-56 w-40">
        <img
          src={props.productImage}
          className="rounded-lg shadow h-36 w-40 mx-auto"
          alt=""
        />
      </div>
      <div className="text-green-400">{props.title}</div>
      <div className="flex mt-2">
        <StarRatings
          rating={props.rating}
          starDimension="20px"
          starSpacing="0px"
          starRatedColor="#fb0"
        />
      </div>
      <div className="text-red-400">₹{props.price}</div>
    </div>
  );
};

export default SingleProductCard;
