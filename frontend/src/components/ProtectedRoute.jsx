import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({
  element: Component,
  adminRoute,
  userRoute,
  ...rest
}) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const roleData = JSON.parse(localStorage.getItem("user"));
  const role = roleData?.role;

  if (!isAuthenticated) {
    Swal.fire({
      title: "Anda diharuskan login untuk melanjutkan!",
      text: "Apakah anda akan melakukan login?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Login",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
    return null;
  }

  if (userRoute && (role === 2 || role === 3)) {
    Swal.fire({
      title: "Akses Dicekal",
      text: "Admin dilarang mengakses halaman user",
      icon: "error",
      confirmButtonText: "Kembali ke dashboard",
    }).then(() => {
      navigate("/admin/dashboard");
    });
    return null;
  }

  if (adminRoute && role === 1) {
    Swal.fire({
      title: "Akses Dicekal",
      text: "User dilarang mengakses halaman admin",
      icon: "error",
      confirmButtonText: "Kembali ke menu utama",
    }).then(() => {
      navigate("/property");
    });
    return null;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
