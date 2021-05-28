import React from "react";
import { Link } from "react-router-dom";

const ProductsCard = (props) => {
  return (
    <div>
      <div className="bg-white sm:h-80 md:h-full w-90 py-2 px-4 shadow-md mb-4 ">
        <div className="font-bold text-xl pb-4 mt-3 mb-2 h-16">
          {props.title}
        </div>
        <div className="px-2 mb-5">
          <div className="grid grid-cols-2 gap-6 ">
            <div>
              <img src={props.image1} className="h-20" alt="" />
              <p className="text-xs">{props.groupname1}</p>
            </div>
            <div>
              <img src={props.image2} className="h-20" alt="" />
              <p className="text-xs">{props.groupname2}</p>
            </div>
            <div>
              <img src={props.image3} className="h-20" alt="" />
              <p className="text-xs">{props.groupname3}</p>
            </div>
            <div>
              <img src={props.image4} className="h-20" alt="" />
              <p className="text-xs">{props.groupname4}</p>
            </div>
          </div>
        </div>
        <Link
          to={`/searchproducts/${props.category}`}
          className="text-blue-500 cursor-pointer w-20"
        >
          see more
        </Link>
      </div>
    </div>
  );
};

export default ProductsCard;
