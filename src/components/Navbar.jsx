import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

const handleSearch = (e) => {
  const value = e.target.value;
  setSearch(value);

  // navigate with query param
  navigate(`/?search=${value}`);
};
  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        MobileStore
      </Link>
     <input
  type="text"
  placeholder="Search phones..."
  value={search}
  onChange={handleSearch}
  className="px-3 py-1 rounded text-black w-1/3"
/>

      {/* Links */}
      <div className="flex items-center gap-6">

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            
          </>
        )}

        {/* USER */}
        {user && user.role === "user" && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

        {/* ADMIN */}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Orders</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;