import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import '../src/Admin/dashboard.css';
import '../src/User/style.css';
import Additem from "./Admin/AddItem";
import Dashboard from "./Admin/dashboard";
import Login from "./User/login";
import Admin from "./User/admin_login";
import './App.css';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/cart/Cart";
import './shop.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function App() {
  return ( // <-- return this JSX
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Additem />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/update" element={<Dashboard />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dash" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
