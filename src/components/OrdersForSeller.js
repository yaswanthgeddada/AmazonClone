import React, { useState, useEffect, useCallback } from "react";
import { getOrders, changeOrderStatus } from "../firebase/productService";
import { useAuth } from "../context/AuthContext";
import OrderCard from "./OrderCard";
import { useUser } from "./../context/UserContext";

const OrdersForSeller = () => {
  const { currentUser } = useAuth();
  const { getCurrentUserProfile } = useUser();

  const [orders, setOrders] = useState();
  const [profile, setProfile] = useState();

  const ordersList = useCallback(async () => {
    const result = await getOrders(currentUser.uid, "sellerId");
    setOrders(result.sort((b, a) => a.createdAt - b.createdAt));
    console.log("orders :", result);
  }, [currentUser.uid]);

  useEffect(() => {
    const getProfile = async () => {
      const user = await getCurrentUserProfile(currentUser.uid);
      setProfile(user[0]);
    };
    ordersList();
    getProfile();
  }, [currentUser, getCurrentUserProfile, ordersList]);

  // console.log(profile);

  async function handleUpdateStatus(itemId, status) {
    await changeOrderStatus(itemId, status);
    ordersList();
  }

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <OrderCard
            item={order}
            handleUpdateStatus={handleUpdateStatus}
            role={profile?.role}
          />
        </div>
      ))}
    </div>
  );
};

export default OrdersForSeller;
