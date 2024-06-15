import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component
import FooterComponent from "./components/FooterComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeUserPage from "./pages/HomeUserPage";
import Homepenyewa from "./pages/homepenyewa";
import Myprofile from "./pages/myprofile";
import Admin from "./pages/admin";
import Tambahproperti from "./pages/tambahproperti";
import Editproperty from "./pages/editproperty";
import Propertydetail from "./pages/propertydetail";
import Booking from "./pages/booking";
import Bookingbayar from "./pages/bookingbayar";
import Transaksi from "./pages/transaksi";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomeUserPage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/konfirmasi/:id" element={<Bookingbayar />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/property/detail/:id" element={<Propertydetail />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/tambahproperti" element={<Tambahproperti />} />
        <Route path="/admin/edit/:id" element={<Editproperty />} />
      </Routes>
      {<FooterComponent />}
    </BrowserRouter>
  );
}

export default App;
