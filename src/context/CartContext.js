import React, { useState, useContext, useEffect } from "react";
import { firestore } from "../firebase/firebase";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const addProductToCart = async (product, customerId, quantity) => {
    let item = { ...product, customerId: customerId, quantity: quantity };

    await firestore
      .collection("cart")
      .add(item)
      .then(() => console.log("item added to cart"))
      .catch((err) => console.log(err));
  };

  async function getCartItems(userId) {
    const result = await firestore
      .collection("cart")
      .where("customerId", "==", userId)
      .get();

    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async function deleteItemInCart(itemId) {
    await firestore
      .collection("cart")
      .doc(itemId)
      .delete()
      .then(() => console.log("Item Deleted"))
      .catch((err) => console.log(err));
  }

  const value = {
    getCartItems,
    addProductToCart,
    deleteItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
