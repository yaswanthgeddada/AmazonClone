import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="w-full   flex md:flex-row flex-col m-3 h-full text-green-900 ">
      <div className="w-80">
        <img
          src={
            item.imageUrl || "/assets/products/electronics/wiprosmartbulb.jpg"
          }
          className="h-40 w-40 p-4 border"
          alt=""
        />
      </div>

      <div className="flex flex-col w-full mt-6">
        <div className="text-xl">{item.title}</div>
        <div className="text-xs mt-2">In Stock</div>
        <div className="mt-2">sold by some-one </div>
        <div className="flex flex-row items-center space-x-5  mt-5">
          <input
            type="number"
            placeholder="Qty"
            min="1"
            max="4"
            className="w-20 py-0"
            value={item.quantity}
            readOnly
          />
          <div> | </div>
          <div className=" hover:text-red-400 cursor-pointer">Delete</div>
        </div>
      </div>

      <div className="w-20 mt-5 font-bold text-xl mx-10"> ₹{item.price}</div>
    </div>
  );
};

export default ItemCard;
