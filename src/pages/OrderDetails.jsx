import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Loader from "../components/Loader";

const OrderDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch order
  const fetchOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrder(res.data.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // ✅ Status Color
  const getStatusColor = (status) => {
    if (status === "Delivered") return "text-green-600";
    if (status === "Shipped") return "text-yellow-600";
    return "text-blue-600";
  };

  if (loading) return <Loader />;
  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <div className="flex justify-between items-center">
          <p className="font-semibold">
            Order ID: {order._id}
          </p>

          <span className={`font-semibold ${getStatusColor(order.orderStatus)}`}>
            {order.orderStatus}
          </span>
        </div>

        <p className="text-gray-500 mt-2">
          {new Date(order.createdAt).toLocaleString()}
        </p>

      </div>

      {/* SHIPPING */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>

       <div className="text-gray-700 space-y-1">
  <p>{order.shippingAddress?.address}</p>
  <p>
    {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
  </p>
  <p>{order.shippingAddress?.country}</p>
</div>

        <p className="mt-2 text-gray-600">
          Payment: {order.paymentMethod}
        </p>

      </div>

      {/* ITEMS */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">Items</h2>

        <div className="space-y-4">

          {order.orderItems.map((item) => (

            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-3"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.product?.image || "/no-image.png"}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-medium">
                    {item.product?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>

            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div className="mt-6 text-right">

          <h2 className="text-2xl font-bold">
            Total: ₹{order.totalPrice}
          </h2>

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;