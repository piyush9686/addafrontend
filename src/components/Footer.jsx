import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Store Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">MobileStore</h2>
          <p className="text-gray-400">
            Your trusted online mobile store. Buy the latest smartphones
            from Apple, Samsung, OnePlus and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>

          <ul className="space-y-2 text-gray-400">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>

            <li>
              <Link to="/orders">Orders</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contact</h2>

          <p className="text-gray-400">
            Email: support@mobilestore.com
          </p>

          <p className="text-gray-400">
            Phone: +91 9876543210
          </p>

          <p className="text-gray-400">
            Location: India
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-400">

        © {new Date().getFullYear()} MobileStore. All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;