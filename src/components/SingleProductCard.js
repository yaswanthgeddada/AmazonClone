import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

import "./scrollbar.css";

const SingleProductCard = (props) => {
  return (
    <div className="bg-white  shadow flex flex-col items-center space-y-10 rounded-lg  h-70 mx-8 px-5  w-48">
      <Link to={`/product/${props.productId}`} key={props.title}>
        <div className="h-36 w-40">
          <img
            src={props.productImage || "/assets/Rhombus.gif"}
            className="rounded-lg shadow h-36 w-40 pt-5"
            alt=""
          />
        </div>
        <div className="text-green-400 w-full ">{props.title}</div>
        <div className="flex mt-2">
          <StarRatings
            rating={props.rating}
            starDimension="20px"
            starSpacing="0px"
            starRatedColor="#fb0"
          />
        </div>
        <div className="text-red-400 pt-3 pb-2">₹{props.price}</div>
      </Link>
    </div>
  );
};

export default SingleProductCard;
