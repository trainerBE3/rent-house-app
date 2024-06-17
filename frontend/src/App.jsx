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
import ProfilePage from "./pages/ProfilePage";
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
import AddProperties from "./pages/AddProperties";
import EditProperties from "./pages/EditProperties";
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
        <Route path="/myprofile" element={<ProfilePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/tambahproperti" element={<Tambahproperti />} />
        <Route path="/admin/edit/:id" element={<Editproperty />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/properties" element={<AdminProperties />} />
        <Route path="/admin/properties/tambahproperti" element={<AddProperties />} />
        <Route path="/admin/properties/editproperti/:id" element={<EditProperties />} />
      </Routes>
      {<FooterComponent />}
    </BrowserRouter>
  );
}

export default App;
