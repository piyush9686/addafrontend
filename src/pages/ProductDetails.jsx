// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api.js";

// const ProductDetails = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const[qty,setQty]=useState(1)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${id}`);
//         setProduct(res.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">

//       <div className="grid md:grid-cols-2 gap-6">

//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-80 object-cover rounded"
//         />

//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>

//           <p className="text-xl mt-4 font-semibold">
//             ₹{product.price}
//           </p>



         



//           <p className="mt-2">Stock: {product.stock}</p>
//            <p className="mt-2">Specs: {product.specifications}</p>

//            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
//             Add to Cart
//           </button> 
           
          
//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductDetails;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";

const ProductDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);

        // ✅ set first image as main
        if (res.data.data.image?.length > 0) {
          setMainImage(res.data.data.image[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    if (product.stock <= 0) {
      alert("Product is out of stock ❌");
      return;
    }

    try {
      await api.post(
        "/cart/add",
        {
          productId: id,
          quantity: Number(qty),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart ✅");
    } catch (error) {
      console.log(error);
      alert("Error adding to cart ❌");
    }
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">

        {/* ✅ IMAGE SECTION */}
        <div>
          {/* MAIN IMAGE */}
          <img
            src={mainImage || "/no-image.png"}
            alt={product.name}
            className="w-full h-80 object-contain rounded"
          />

          {/* THUMBNAILS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {product.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 object-contain rounded cursor-pointer border ${
                  mainImage === img ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* ✅ DETAILS */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">
            {product.description}
          </p>

          <p className="text-xl mt-4 font-semibold">
            ₹{product.price}
          </p>

          {/* STOCK */}
          {product.stock > 0 ? (
            <p className="mt-2 text-green-600 font-medium">
              In Stock: {product.stock}
            </p>
          ) : (
            <p className="mt-2 text-red-600 font-semibold">
              Out of Stock ❌
            </p>
          )}

          {/* ✅ FIXED SPECIFICATIONS */}
          <p className="mt-2">
            Specs: {product.specifications}
          </p>

          {/* QUANTITY */}
          {product.stock > 0 && (
            <div className="mt-4">
              <label className="mr-2">Qty:</label>
              <input
                type="number"
                value={qty}
                min="1"
                max={product.stock}
                onChange={(e) =>
                  setQty(
                    Math.min(
                      product.stock,
                      Math.max(1, Number(e.target.value))
                    )
                  )
                }
                className="border px-2 py-1 w-16 rounded"
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={addToCart}
            disabled={product.stock <= 0}
            className={`mt-5 w-full py-2 rounded text-white ${
              product.stock > 0
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api.js";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");

//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${id}`);
//         setProduct(res.data.data);

//         // ✅ set first image as default
//         setSelectedImage(res.data.data.images?.[0]);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const addToCart = async () => {
//     if (!token) {
//       alert("Login first");
//       return;
//     }

//     if (product.stock <= 0) {
//       alert("Out of stock ❌");
//       return;
//     }

//     try {
//       await api.post(
//         "/cart/add",
//         {
//           productId: id,
//           quantity: qty,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Added to cart ✅");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-8">

//         {/* LEFT SIDE */}
//         <div>

//           {/* MAIN IMAGE */}
//           <img
//             src={selectedImage || "/no-image.png"}
//             alt="product"
//             className="w-full h-96 object-cover rounded-xl"
//           />

//           {/* THUMBNAILS */}
//           <div className="flex gap-3 mt-4">
//             {product.images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="thumb"
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
//                   selectedImage === img
//                     ? "border-blue-500"
//                     : "border-gray-300"
//                 }`}
//               />
//             ))}
//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>

//           <p className="text-gray-600 mt-2">
//             {product.description}
//           </p>

//           <p className="text-xl mt-4 font-semibold">
//             ₹{product.price}
//           </p>

//           {/* STOCK */}
//           {product.stock > 0 ? (
//             <p className="text-green-600 mt-2">
//               In Stock ({product.stock})
//             </p>
//           ) : (
//             <p className="text-red-600 mt-2">
//               Out of Stock ❌
//             </p>
//           )}

//           {/* QTY */}
//           {product.stock > 0 && (
//             <div className="mt-4">
//               <label>Qty:</label>
//               <input
//                 type="number"
//                 value={qty}
//                 min="1"
//                 max={product.stock}
//                 onChange={(e) => setQty(Number(e.target.value))}
//                 className="border ml-2 px-2 py-1 w-16"
//               />
//             </div>
//           )}

//           {/* BUTTON */}
//           <button
//             onClick={addToCart}
//             disabled={product.stock <= 0}
//             className={`mt-5 w-full py-2 rounded text-white ${
//               product.stock > 0
//                 ? "bg-blue-600 hover:bg-blue-700"
//                 : "bg-gray-400"
//             }`}
//           >
//             {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductDetails;