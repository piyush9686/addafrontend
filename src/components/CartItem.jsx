import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <img
          src={item.product.image[0]}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded"
        />

        <div>
          <h2 className="font-semibold">
            {item.product.name}
          </h2>

          <p>₹{item.product.price}</p>
          <p className="text-sm text-gray-500">
            Qty: {item.quantity}
          </p>
        </div>

      </div>

      {/* RIGHT */}
      <button
        onClick={() => onRemove(item.product._id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;