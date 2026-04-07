
// import Login from "./pages/Login";
// import { Routes,Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import ProductDetails from "./pages/ProductDetails";
// import Register from "./pages/Register";
// import OrderDetails from "./pages/OrderDetails";
// import Orders from "./pages/Orders";
// import Checkout from "./pages/Checkout";
// import Dashboard from "./admin/Dashboard";
// import AddProduct from "./admin/AddProduct";
// import ProductList from "./admin/ProductList";
// import EditProduct from "./admin/EditProduct";
// import AdminOrders from "./admin/Orders";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import ChatPage from "./pages/ChatPage";
// function App() {
//   return (
//     <>
//     <Routes>
//       <Route path='/login' element={<Login/>}/>
//     </Routes>
//     <Routes>
//       <Route path='/' element={<Home/>}/>
//     </Routes>

//     <Routes>
//       <Route path='/cart' element={<Cart/>}/>
//     </Routes>
//     <Routes>
//       <Route path='/product/:id' element={<ProductDetails/>}/>
//     </Routes>
//     <Routes>
//       <Route path='/register' element={<Register/>}/>
//       <Route path="/order/:id" element={<OrderDetails/>} />
//       <Route path="/orders" element={<Orders/>} />
//       <Route path="/checkout" element={<Checkout/>} />
//       <Route path="/admin/dashboard" element={<Dashboard/>}/>
//       <Route path="/admin/add-product" element={<AddProduct/>}/>

//       <Route path="/admin/products" element={<ProductList />} />
//       <Route path="/admin/edit-product/:id" element={<EditProduct />} /> 
//       <Route path="/admin/orders" element={<AdminOrders/>} /> 

//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword/>} />
//        <Route path="/chatbot" element={<ChatPage/>}/>

//     </Routes>
//     </>
//   );
// }

// export default App;




import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import AdminOrders from "./admin/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/order/:id" element={<OrderDetails />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/add-product" element={<AddProduct />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin/orders" element={<AdminOrders />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
  );
}

export default App;