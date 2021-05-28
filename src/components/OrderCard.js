import React, { useEffect, useState } from "react";
import { getProductById } from "../firebase/productService";

const OrderCard = ({ item }) => {
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const result = await getProductById(item.productId);
      console.log(result);
      setProduct(result);
    };

    getProduct();
  }, [item.productId]);

  return (
    <div className="w-full flex m-3 h-40 text-green-900 ">
      <div className="w-80 ">
        <img
          src={product?.imageUrl || "/assets/Rhombus.gif"}
          className="h-40 w-40 p-4 border"
          alt=""
        />
      </div>

      <div className="flex flex-col w-full mt-6">
        <div className="text-xl">{product?.title}</div>
        <div className="text-xs mt-2">Status : {item.status}</div>
        <div className="mt-2">seller : by some-one </div>
        <div className="flex flex-row items-center space-x-5  mt-5">
          <div className=" hover:text-red-400 cursor-pointer">Cancle</div>
        </div>
      </div>

      <div className="w-20 mt-5 font-bold text-xl mx-10">
        {" "}
        ₹{product?.price}
      </div>
    </div>
  );
};

export default OrderCard;
