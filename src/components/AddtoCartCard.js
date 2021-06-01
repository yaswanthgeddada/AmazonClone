import React from "react";
import { FcLock } from "react-icons/fc";
import { AiFillPushpin } from "react-icons/ai";
import CircularProgress from "@material-ui/core/CircularProgress";

const AddtoCartCard = ({
  addItemToCart,
  isLoading,
  quantity,
  totalSum,
  items,
  orderItems,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-xl md:w-96 w-80 md:h-96 h-56 ">
      <div className="flex flex-col px-8 py-10">
        <div className="flex flex-row p-2">
          {totalSum > 0 && (
            <div>
              <div className="text-lg text-right w-56">
                <hr className="p-2" />
                <p>
                  Subtotal({items} Items) : ₹{totalSum}
                </p>
              </div>
            </div>
          )}

          {!totalSum && (
            <div>
              <label htmlFor="quantity">Quantity : </label>
              <input
                id="quantity"
                type="number"
                className="mx-2 p-0 border border-yellow-600 focus:ring-2"
                min="1"
                max="4"
                ref={quantity}
              />

              <button
                onClick={addItemToCart}
                className="px-10 w-full my-2 py-1 bg-yellow-300 hover:bg-yellow-400 rounded-full focus:outline-none "
              >
                {isLoading && (
                  <CircularProgress size={15} style={{ marginRight: 10 }} />
                )}
                Add to Cart
              </button>
            </div>
          )}
        </div>

        <button
          onClick={orderItems}
          className="px-10  my-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded-full focus:outline-none "
        >
          Buy Now
        </button>
        <div className="flex items-center space-x-2">
          <FcLock />
          <p>Secure Transaction</p>
        </div>
        <div className="flex  items-center space-x-2">
          <AiFillPushpin />
          <p>Delivery to Yashu</p>
        </div>
      </div>
    </div>
  );
};

export default AddtoCartCard;
