import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import CartItem from "../components/CartItem";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Cart = () => {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch cart (REUSABLE)
  const fetchCart = async () => {
   const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.data;

      // ✅ handle both cases (array or object)
      if (Array.isArray(data)) {
        setCart(data[0]?.items || []);
      } else {
        setCart(data?.items || []);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Remove item (FIXED)
  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 IMPORTANT: refresh cart after delete
      fetchCart();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <> 
      <Navbar />
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* ✅ LOADER */}
      {loading ? (
        <Loader />
      ) : cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {/* ITEMS */}
          <div className="space-y-4">

            {cart.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onRemove={handleRemove}
              />
            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-6 bg-white p-4 text-right">

            <h2 className="text-xl font-bold">
              Total: ₹{totalPrice}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-3 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>

          </div>
        </>
      )}

    </div>
     </>
  );
};

export default Cart;