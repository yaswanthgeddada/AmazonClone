import React, { useState, useEffect, useCallback } from "react";

import { getOrders, getProductById } from "../firebase/productService";
import { useAuth } from "../context/AuthContext";
import OrderCard from "../components/OrderCard";
import { useUser } from "./../context/UserContext";

const Orders = () => {
  const { currentUser } = useAuth();
  const { getCurrentUserProfile } = useUser();

  const [items, setItems] = useState();
  const [profile, setProfile] = useState();

  const [loading, setLoading] = useState(false);

  const orders = useCallback(async () => {
    setLoading(true);
    const result = await getOrders(currentUser.uid, "customerId");
    setItems(result);
    setLoading(false);
  }, [currentUser.uid]);

  useEffect(() => {
    const getProfile = async () => {
      const user = await getCurrentUserProfile(currentUser.uid);
      setProfile(user[0]);
    };

    orders();
    getProfile();
  }, [currentUser, getCurrentUserProfile, orders]);

  return (
    <div>
      <div className=" bg-gray-200 overflow-x-hidden px-10 flex flex-col">
        <div className="flex justify-around items-center mt-10  ">
          <div className="text-3xl">Your Orders</div>
          <div className="flex ">
            <input type="search" className=" py-1 px-2 mr-3  rounded-lg" />
            <button className="bg-gradient-to-b from-gray-500 to-gray-700 px-5  py-0 text-white font-semibold rounded-lg">
              Search Orders
            </button>
          </div>
        </div>
        <div className=" mx-auto  rounded-lg mt-5 w-3/5  bg-white p-5 mb-5  ">
          {items &&
            items.map((item) => (
              <div key={item.id}>
                <hr />
                <OrderCard item={item} role={profile.role} />
              </div>
            ))}
        </div>
      </div>
      {loading && !items && (
        <div className="justify-center items-center flex">No Orders</div>
      )}
    </div>
  );
};

export default Orders;
