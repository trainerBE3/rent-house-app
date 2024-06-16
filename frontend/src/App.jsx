import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component
import FooterComponent from "./components/FooterComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// User
import PropertyPage from "./pages/PropertyPage";
import DetailPropertyPage from "./pages/DetailPropertyPage";
import BookingPage from "./pages/BookingPage";
import Myprofile from "./pages/myprofile";
// Admin
import Admin from "./pages/admin";
import Tambahproperti from "./pages/tambahproperti";
import Editproperty from "./pages/editproperty";
import Propertydetail from "./pages/propertydetail";
import Booking from "./pages/booking";
import Bookingbayar from "./pages/bookingbayar";
import Transaksi from "./pages/transaksi";
import DashboardAdmin from "./pages/DashboardAdmin";
import AdminProperties from "./pages/AdminProperties";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/property/detail/:id" element={<DetailPropertyPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/booking/konfirmasi/:id" element={<Bookingbayar />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/property/booking/:id" element={<Propertydetail />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/tambahproperti" element={<Tambahproperti />} />
        <Route path="/admin/edit/:id" element={<Editproperty />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
      </Routes>
      {<FooterComponent />}
    </BrowserRouter>
  );
}

export default App;
