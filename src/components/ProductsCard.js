import React from "react";

const ProductsCard = (props) => {
  return (
    <div>
      <div className="bg-white h-full w-90 py-2 px-4 shadow-md mb-4 ">
        <div className="font-bold text-xl pb-4 mt-3 mb-2">{props.title}</div>
        <div className="px-2 mb-5">
          <div className="grid grid-cols-2 gap-6 ">
            <div>
              <img src={props.image1} className="h-28" alt="" />
              <p className="text-xs">{props.groupname1}</p>
            </div>
            <div>
              <img src={props.image2} className="h-28" alt="" />
              <p className="text-xs">{props.groupname2}</p>
            </div>
            <div>
              <img src={props.image3} className="h-28" alt="" />
              <p className="text-xs">{props.groupname3}</p>
            </div>
            <div>
              <img src={props.image4} className="h-28" alt="" />
              <p className="text-xs">{props.groupname4}</p>
            </div>
          </div>
        </div>
        <div className="text-blue-500 cursor-pointer w-20">see more</div>
      </div>
    </div>
  );
};

export default ProductsCard;
