import { useEffect, useState } from "react";
import api from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
const Dashboard = () => {

  const [stats, setStats] = useState({
    products: 0,
    orders: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const productsRes = await api.get("/products");

        const ordersRes = await api.get("/order", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const ordersData = ordersRes.data.data;

        setStats({
          products: productsRes.data.data.length,
          orders: ordersData.length
        });

        // ✅ Take latest 5 orders
        setRecentOrders(ordersData.slice(0, 5));

      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
    <Navbar />
    <div className="p-6 space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">

            {recentOrders.map((order) => (

              <div
                key={order._id}
                className="flex justify-between items-center border-b pb-3"
              >

                {/* LEFT */}
                <div>
                  <p className="font-semibold">
                    {order.user?.name || "Unknown User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.user?.email}
                  </p>
                </div>

                {/* MIDDLE */}
                <p className="font-medium">
                  ₹{order.totalPrice}
                </p>

                {/* RIGHT */}
                <span className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700">
                  {order.orderStatus}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
    </>
  );
};

export default Dashboard;