import React, { useEffect, useState, useCallback } from "react";
import ItemCard from "../components/ItemCard";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import AddtoCartCard from "./../components/AddtoCartCard";
import { addOrder } from "../firebase/productService";
import { sendEmail } from "../firebase/emailService";
import { useUser } from "./../context/UserContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const { getCartItems, deleteItemInCart, setCartItemsLength } = useCart();
  const { currentUser } = useAuth();
  const { getCurrentUserProfile } = useUser();

  const getCartItemss = useCallback(async () => {
    const result = await getCartItems(currentUser.uid);
    setCartItems(result);
    console.log(result);

    const Total = result.reduce(
      (sum, ci) => sum + Number(ci.price) * Number(ci.quantity),
      0
    );

    console.log(Total);
    setTotalPrice(Total);
  }, [currentUser.uid, getCartItems]);

  const orderItems = useCallback(async () => {
    console.log("clicked");
    await cartItems.forEach((itm) => {
      addOrder(
        itm.productId,
        itm.customerId,
        itm.sellerId,
        itm.quantity,
        itm.price
      );
    });

    await cartItems.forEach((itm) => {
      deleteItemInCart(itm.id);
    });

    getCartItemss();
    setCartItemsLength(0);

    console.log("products added");
  }, [cartItems, deleteItemInCart, getCartItemss, setCartItemsLength]);

  useEffect(() => {
    getCartItemss();
  }, [currentUser.uid, getCartItems, getCartItemss]);

  return (
    <div>
      <div className=" bg-gray-200 h-screen overflow-x-hidden px-10 flex flex-col-reverse	 md:flex-row space-y-5">
        <div className="  rounded-lg mt-5 w-full  bg-white p-5 mb-5 ">
          {totalPrice > 0 &&
            cartItems.map((item) => (
              <div key={item.id}>
                <hr />
                <ItemCard item={item} />
              </div>
            ))}
          <div>
            {totalPrice > 0 && (
              <div className="text-xl text-right ">
                <hr className="p-2" />
                Subtotal({cartItems.length} Items) : ₹{totalPrice}
              </div>
            )}
          </div>
        </div>
        <div className="w-1/4 md:mx-10  mt-5 sticky">
          {cartItems && (
            <AddtoCartCard
              totalSum={totalPrice}
              items={cartItems?.length}
              orderItems={orderItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
