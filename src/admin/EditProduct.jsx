import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
const EditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);
        setForm(res.data.data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await api.put(`/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product updated ✅");
      navigate("/admin/products");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full p-3 border rounded"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 border rounded"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-3 border rounded"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Update Product
          </button>

        </form>
      )}

    </div>
    </>
  );
};

export default EditProduct;