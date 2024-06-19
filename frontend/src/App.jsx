import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component
import ProtectedRoute from "./components/ProtectedRoute";
import FooterComponent from "./components/FooterComponent";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
// User
import PropertyPage from "./pages/PropertyPage";
import DetailPropertyPage from "./pages/DetailPropertyPage";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
// Admin
import DashboardAdmin from "./pages/DashboardAdmin";
import AdminProperties from "./pages/AdminProperties";
import AddProperties from "./pages/AddProperties";
import EditProperties from "./pages/EditProperties";
import AdminBooking from "./pages/AdminBooking";
import AdminTransaction from "./pages/AdminTransaction";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route
          path="/property/detail/:id"
          element={<ProtectedRoute element={DetailPropertyPage} userRoute />}
        />
        <Route
          path="/booking"
          element={<ProtectedRoute element={BookingPage} userRoute />}
        />
        <Route
          path="/myprofile"
          element={<ProtectedRoute element={ProfilePage} userRoute />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={DashboardAdmin} adminRoute />}
        />
        <Route
          path="/admin/properties"
          element={<ProtectedRoute element={AdminProperties} adminRoute />}
        />
        <Route
          path="/admin/tambahproperti"
          element={<ProtectedRoute element={AddProperties} adminRoute />}
        />
        <Route
          path="/admin/edit/:id"
          element={<ProtectedRoute element={EditProperties} adminRoute />}
        />
        <Route
          path="/admin/bookings"
          element={<ProtectedRoute element={AdminBooking} adminRoute />}
        />
        <Route
          path="/admin/transactions"
          element={<ProtectedRoute element={AdminTransaction} adminRoute />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {<FooterComponent />}
    </BrowserRouter>
  );
}

export default App;
