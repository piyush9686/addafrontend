import { useEffect, useState } from "react";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Chatbot from "../components/Chatbot";
const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // ✅ GET USER ROLE
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Fetch products
  useEffect(() => {
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

    fetchProducts();
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await api.post(
        "/cart/add",
        {
          productId,
          quantity: 1,
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
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>

        {/* ✅ LOADER */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAdmin={isAdmin}   // ✅ FIX ADDED
                />
              ))
            )}

          </div>
        )}
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Home;