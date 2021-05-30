import React, { useEffect, useState } from "react";
import { getProductById } from "../firebase/productService";

import { useUser } from "../context/UserContext";
import { sendEmail } from "../firebase/emailService";

const OrderCard = ({ item, handleUpdateStatus, role }) => {
  const { getCurrentUserProfile } = useUser();
  const [product, setProduct] = useState();
  const [customer, setCustomer] = useState();
  const d = new Date(item.createdAt);

  useEffect(() => {
    const getProduct = async () => {
      const result = await getProductById(item.productId);
      // console.log(result);
      setProduct(result);
    };

    getProduct();
  }, [item.productId]);

  useEffect(() => {
    const getCustomer = async () => {
      const result = await getCurrentUserProfile(item.customerId);
      // console.log(result[0]);
      setCustomer(result[0]);
    };
    getCustomer();
  }, [getCurrentUserProfile, item]);

  return (
    <div className="w-full  flex md:flex-row sm:flex-col m-3 h-40 text-green-900 ">
      <div className="w-96 ">
        <img
          src={product?.imageUrl || "/assets/Rhombus.gif"}
          className="h-40 md:w-4/5 p-2 border"
          alt=""
        />
      </div>

      <div className="flex flex-col w-full justify-center">
        <div className="text-xl">{product?.title}</div>
        <div className="text-xs mt-2">Status : {item.status}</div>
        {role === "customer" && (
          <div className="mt-2">seller : by some-one </div>
        )}
        {role === "Seller" && (
          <div className="flex flex-row items-center space-x-5  mt-5">
            <div>
              {d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()}
            </div>
            <div
              className=" hover:text-red-400 cursor-pointer"
              onClick={() => {
                handleUpdateStatus(item.id, "Accept");
                sendEmail(
                  customer.email,
                  "Your order has been Accepted and will be delivierid soon, Thanks.",
                  product.title,
                  item.price,
                  "Accepted"
                );
              }}
            >
              Accept
            </div>
            <div
              className=" hover:text-red-400 text-red-500 cursor-pointer"
              onClick={() => {
                handleUpdateStatus(item.id, "Reject");
                sendEmail(
                  customer.email,
                  "Due to some unexpected reasons we have cancled your request . Sorry!",
                  product.title,
                  item.price,
                  "Rejected"
                );
              }}
            >
              Reject
            </div>
          </div>
        )}
      </div>
      <div className="w-40 mt-5 text-sm mx-10">
        {" "}
        <span className="text-blue-500 font-semibold">Address : </span>{" "}
        {customer?.address}
      </div>

      <div className="w-20 mt-5 font-bold text-xl mx-10">
        {" "}
        ₹{product?.price}
      </div>
    </div>
  );
};

export default OrderCard;
