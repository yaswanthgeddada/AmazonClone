import React from "react";
import StarRatings from "react-star-ratings";

const ReviewCard = () => {
  return (
    <div>
      <div className="flex space-x-2">
        <img
          src="/assets/nophoto.jpg"
          alt=""
          className="rounded-full h-10 w-10"
        />
        <p className="text-lg">GANDRETI NAGENDR</p>
      </div>
      <div className="flex space-x-2">
        <StarRatings
          rating={1}
          starDimension="20px"
          starSpacing="0px"
          starRatedColor="#fb0"
        />

        <p className="font-bold">Product Name</p>
      </div>
      <div className="w-2/5 mt-2">
        Look - Rating 4/5 Camera - 3/5 Battery - 3.5/5 Performance 3.5/5 Overall
        3.5/5 on Middle range 5G..
      </div>
    </div>
  );
};

export default ReviewCard;
