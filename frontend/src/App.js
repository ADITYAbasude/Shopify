import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import { Dashboard } from "./pages/Dashboard";
import SellerRegistration from "./pages/seller/SellerRegistration";
import AllProducts from "./pages/seller/AllProducts";
import AddProducts from "./pages/seller/AddProducts";
import { LogIn } from "./pages/auth/LogIn";
import { SignUp } from "./pages/auth/SignUp";
import ProductPage from "./pages/buyer/ProductPage";
import ProductDetail from "./pages/buyer/ProductDetailed";
import Cart from "./pages/buyer/Cart";
import SellerLogin from "./pages/seller/SellerLogin";
import Profile from "./pages/buyer/Profile";
import Orders from "./pages/buyer/Orders";
import SeeOrders from "./pages/seller/SeeOrders";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Dashboard />
              </>
            }
          />

          <Route
            exact
            path="/sellerRegistration"
            element={<SellerRegistration />}
          />
          <Route path="/sellerAllProducts/:id" element={<AllProducts />} />
          <Route exact path="/AddProducts" element={<AddProducts />} />
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/product/:type" element={<ProductPage />} />
          <Route exact path="/sellerLogin" element={<SellerLogin />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/cart/user=:user" element={<Cart />} />
          <Route path="/profile/user=:user" element={<Profile />} />
          <Route path="/user:user/orders" element={<Orders />} />
          <Route path="/sellerOrders" element={<SeeOrders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
