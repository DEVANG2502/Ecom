import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToasterComponent from "./components/ui/toaster";
import SonnerComponent from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import NewArrivals from "./pages/Newarrivals";

import Navbar from "./components/Navbar"; // Ensure Navbar is imported
import Cart from "./pages/Cart";
import CartPage from "./pages/CartPage";
const queryClient = new QueryClient();
import { CartProvider } from "./context/CartContext";


const App = () => (
  <CartProvider>

    <QueryClientProvider client={queryClient}>
      <Router>
        <TooltipProvider>
          <ToasterComponent />
          <SonnerComponent />
          <Navbar /> {/* Navbar added to reflect cart count */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/newarrivals" element={<NewArrivals />} />
            <Route path="/cart" element={<CartPage />} />

          </Routes>
          <Products/>
          <Cart/>
        </TooltipProvider>
      </Router>
    </QueryClientProvider>
    </CartProvider>

);

export default App;
