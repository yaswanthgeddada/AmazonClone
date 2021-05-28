import React, { useState, useEffect, useCallback } from "react";
import { getOrders } from "../firebase/productService";
import { useAuth } from "../context/AuthContext";
import OrderCard from "./OrderCard";

const OrdersForSeller = () => {
  const { currentUser } = useAuth();

  const [orders, setOrders] = useState();

  const ordersList = useCallback(async () => {
    const result = await getOrders(currentUser.uid, "sellerId");
    setOrders(result);
    console.log("orders :", result);
  }, [currentUser.uid]);

  useEffect(() => {
    ordersList();
  }, [currentUser, ordersList]);

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <OrderCard item={order} />
        </div>
      ))}
    </div>
  );
};

export default OrdersForSeller;
