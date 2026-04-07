import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all orders (admin)
  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await api.get("/order", {
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

  // ✅ Update status
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      await api.put(
        `/order/${id}`,
        { orderStatus:status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // refresh UI
      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // 🎨 Status color
  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Shipped") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  if (loading) return <Loader />;

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white p-6 rounded-xl shadow space-y-4"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-semibold">
                  Order ID: {order._id}
                </p>

                <p className="text-sm text-gray-500">
                  User: {order.user?.name} ({order.user?.email})
                </p>
              </div>

              <span className={`px-3 py-1 rounded ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>

            </div>

            {/* ADDRESS */}
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Shipping Address:</p>

              <p>
                {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country}
              </p>

              <p className="mt-1">
                Payment: {order.paymentMethod}
              </p>
            </div>

            {/* ITEMS */}
            <div className="space-y-2">

              {order.orderItems.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between border-b pb-2"
                >

                  <span>
                    {item.product?.name} × {item.quantity}
                  </span>

                  <span>
                    ₹{item.price * item.quantity}
                  </span>

                </div>

              ))}

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center">

              <p className="font-bold text-lg">
                Total: ₹{order.totalPrice}
              </p>

              {/* STATUS UPDATE */}
              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>

          </div>

        ))}

      </div>

    </div>
    </>
  );
};

export default AdminOrders;