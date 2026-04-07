import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update UI instantly
      setProducts(products.filter(p => p._id !== id));

      alert("Product deleted ✅");

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={product.image[0] || "/no-image.png"}
              alt={product.name}
              className="w-full h-40 object-contain rounded"
            />

            {/* INFO */}
            <h2 className="font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.brand}</p>
            <p className="font-bold mt-1">₹{product.price}</p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
    </>
  );
};

export default ProductList;