import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Status Color
  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-600";
    if (status === "Shipped") return "text-yellow-600";
    return "text-blue-600";
  };

  return (
    <>  
    <Navbar />
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">

                <div>
                  <p className="font-semibold">
                    Order ID: {order._id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className={`font-semibold ${getStatusColor(order.orderStatus)}`}>
                  {order.status}
                </span>

              </div>

              {/* ITEMS */}
              <div className="space-y-3">

                {order.orderItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-2"
                  >

                    <img
                      src={item.product?.image[0] || "/no-image.png"}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h2 className="font-medium">
                        {item.product?.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>
                ))}

              </div>

              {/* FOOTER */}
              <div className="mt-4 flex justify-between items-center">

                <p className="font-bold text-lg">
                  Total: ₹{order.totalPrice}
                </p>

                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
    </>
  );
};

export default Orders;