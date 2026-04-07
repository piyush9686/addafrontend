import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
const AddProduct = () => {

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    specifications: ""
  });

  // ✅ 4 slots for images
  const [imageSlots, setImageSlots] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE IMAGE PER SLOT
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedSlots = [...imageSlots];
    updatedSlots[index] = file;
    setImageSlots(updatedSlots);

    const previewUrls = updatedSlots.map(file =>
      file ? URL.createObjectURL(file) : null
    );
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // append form fields
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    // ✅ append only selected images
    imageSlots.forEach((img) => {
      if (img) {
        formData.append("images", img);
      }
    });

    // 🔍 DEBUG
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert("Product added successfully ✅");

      // reset form
      setForm({
        name: "",
        brand: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        specifications: ""
      });

      setImageSlots([null, null, null, null]);
      setPreviews([null, null, null, null]);

    } catch (err) {
      console.log(err.response?.data || err.message);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again ❌");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >

        <h1 className="text-2xl font-bold text-center">
          Add New Product
        </h1>

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="input" />
          <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="input" />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="input" />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="input" />
          <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="input" />
          <input name="description" placeholder="Product Description" value={form.description} onChange={handleChange} className="input" />

        </div>

        {/* SPECIFICATIONS */}
        <textarea
          name="specifications"
          placeholder="Product Specifications"
          value={form.specifications}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="4"
        />

        {/* ✅ IMAGE GRID UI */}
        <div>
          <label className="block mb-3 font-medium">Product Images</label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {imageSlots.map((img, index) => (
              <label
                key={index}
                className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative"
              >

                {/* hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />

                {/* preview OR upload UI */}
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-2xl">☁️</div>
                    <p className="text-sm">Upload</p>
                  </div>
                )}

              </label>
            ))}

          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Product
        </button>

      </form>

      {/* styles */}
      <style>
        {`
          .input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}
      </style>

    </div>
    </>
  );
};

export default AddProduct;