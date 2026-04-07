// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product, onAddToCart }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">

//       {/* ✅ IMAGE CLICK → PRODUCT DETAILS */}
//       <img
//         src={product.image[0] || "/no-image.png"}
//         alt={product.name}
//         onClick={() => navigate(`/product/${product._id}`)}
//         className="w-48 h-48 object-contain bg-gray-100 rounded cursor-pointer mx-auto"
//       />

//       {/* DETAILS */}
//       <h2 className="text-lg font-semibold mt-2">
//         {product.name}
//       </h2>

//       <p className="text-gray-500">{product.brand}</p>

//       <p className="text-xl font-bold mt-1">
//         ₹{product.price}
//       </p>

//       {/* BUTTON */}
//       <button
//         onClick={() => onAddToCart(product._id)}
//         className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         Add to Cart
//       </button>

//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart, isAdmin }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">

      {/* ✅ IMAGE CONTAINER (FIXED UI) */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
        <img
          src={product.image?.[0] || "/no-image.png"} // ✅ SAFE ACCESS
          alt={product.name}
          onClick={() => navigate(`/product/${product._id}`)}
          className="max-h-full max-w-full object-contain cursor-pointer"
        />
      </div>

      {/* DETAILS */}
      <h2 className="text-lg font-semibold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-500">{product.brand}</p>

      <p className="text-xl font-bold mt-1">
        ₹{product.price}
      </p>

      {/* ✅ SHOW BUTTON ONLY FOR USER */}
      {!isAdmin && (
        <button
          onClick={() => onAddToCart(product._id)}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}

    </div>
  );
};

export default ProductCard;