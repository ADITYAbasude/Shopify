
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { LogIn } from './components/auth/LogIn';
import { SignUp } from './components/auth/SignUp';
import ProductPage from './components/pages/buyer/ProductPage';
import { Dashboard } from './components/pages/Dashboard';
import AddProducts from './components/pages/seller/AddProducts';
import AllProducts from './components/pages/seller/AllProducts';
import SellerLogin from './components/pages/seller/SellerLogin';
import SellerRegistration from './components/pages/seller/SellerRegistration';
import Footer from './components/tools/Footer';
import Navigation from './components/tools/Navigation';
import ProductDetail from './components/pages/buyer/ProductDetailed'
import Cart from './components/pages/buyer/Cart';
import Profile from './components/pages/buyer/Profile';
import Orders from './components/pages/buyer/Orders';
import SeeOrders from './components/pages/seller/SeeOrders';



function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path='/' element={
            <>
              <Dashboard />

            </>
          } />

          <Route exact path='/sellerRegistration' element={<SellerRegistration />} />
          <Route path='/sellerAllProducts/:id' element={<AllProducts />} />
          <Route exact path='/AddProducts' element={<AddProducts />} />
          <Route exact path='/login' element={<LogIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/product/:type' element={<ProductPage />} />
          <Route exact path='/sellerLogin' element={<SellerLogin />} />
          <Route path='/productDetail/:id' element={<ProductDetail />} />
          <Route path='/cart/user=:user' element={<Cart />} />
          <Route path='/profile/user=:user' element={<Profile />} />
          <Route path='/user:user/orders' element={<Orders />} />
          <Route path='/sellerOrders' element={<SeeOrders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
