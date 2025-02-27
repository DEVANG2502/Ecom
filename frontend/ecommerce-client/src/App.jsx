import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Products from "./pages/Products";
// import NewArrivals from "./pages/NewArrivals";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Navbar from "./pages/Navbar";
import { CartProvider } from "./context/CartContext";
import PaymentForm from "./pages/PaymentForm";
// import Navbar from "./pages/Navbar";
import PaymentPagee from "./pages/PaymentPagee";


//
import SuccessPage from "./pages/SuccessPage";


// ✅ Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

// ✅ Add PropTypes validation to avoid missing prop errors
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // ✅ Update state when token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <CartProvider>
      <Router>
        {isLoggedIn && <Navbar />}
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute element={<LandingPage />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
          <Route path="/payment" element={<ProtectedRoute element={<PaymentPage />} />} />
          <Route path="/payment-form" element={<ProtectedRoute element={<PaymentForm />} />} />
          <Route path="/paymentt" element={<ProtectedRoute element={<PaymentPagee />} />} />
        </Routes>
        

        {/* {isLoggedIn && (
          <>
            <Products />
            <NewArrivals />
          </>
        )} */}
        
      </Router>
    </CartProvider>
    
  );
};

export default App;
