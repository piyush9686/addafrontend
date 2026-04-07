import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import loadRazorpay from "../utils/loadRazorpay.js";

const Checkout = () => {

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {

    const token = localStorage.getItem("token");
    const { address, city, postalCode, country } = form;

    if (!address || !city || !postalCode || !country) {
      alert("Please fill all address fields");
      return;
    }

    try {

      // ✅ COD FLOW
      if (paymentMethod === "COD") {

        await api.post(
          "/order",
          {
            shippingAddress: { address, city, postalCode, country },
            paymentMethod: "COD"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Order placed successfully 🎉");
        navigate("/orders");
      }

      // ✅ RAZORPAY FLOW
      else if (paymentMethod === "Razorpay") {

        const res = await loadRazorpay();

        if (!res) {
          alert("Razorpay SDK failed to load");
          return;
        }

        // 🔥 CALL BACKEND TO CREATE RAZORPAY ORDER
        const { data } = await api.post(
          "/payment/create-order",   // 👈 your backend route
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const options = {
          key: data.key, // Razorpay key
          amount: data.amount,
          currency: "INR",
          name: "MobileStore",
          description: "Order Payment",
          order_id: data.orderId,

          handler: async function (response) {

            // ✅ VERIFY PAYMENT
            await api.post(
              "/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shippingAddress: { address, city, postalCode, country }
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            );

            alert("Payment successful 🎉");
            navigate("/orders");
          },

          prefill: {
            name: "User",
            email: "user@email.com"
          },

          theme: {
            color: "#3399cc"
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* ADDRESS */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input name="address" placeholder="Street Address" className="p-3 border rounded"
              value={form.address} onChange={handleChange} />

            <input name="city" placeholder="City" className="p-3 border rounded"
              value={form.city} onChange={handleChange} />

            <input name="postalCode" placeholder="Postal Code" className="p-3 border rounded"
              value={form.postalCode} onChange={handleChange} />

            <input name="country" placeholder="Country" className="p-3 border rounded"
              value={form.country} onChange={handleChange} />

          </div>
        </div>

        {/* PAYMENT */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>

          <div className="space-y-3">

            <label className="flex items-center gap-3 border p-3 rounded">
              <input type="radio" value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)} />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-3 border p-3 rounded">
              <input type="radio" value="Razorpay"
                checked={paymentMethod === "Razorpay"}
                onChange={(e) => setPaymentMethod(e.target.value)} />
              <span>Razorpay 💳</span>
            </label>

          </div>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Checkout;