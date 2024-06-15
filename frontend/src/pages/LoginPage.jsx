import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../dist/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/login/auth", { email, password });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);

      switch (userData.user.role) {
        case 1:
          navigate("/home");
          break;
        case 2:
          navigate("/admin");
          break;
        case 3:
          navigate("/superadmin");
          break;
        default:
          navigate("/");
      }
      navigate("/home");
    } catch (err) {
      const valErrors = err.response.data.errors;
      let errorMsg = "";
      if (valErrors.length > 0) {
        errorMsg = valErrors.reduce((acc, error) => {
          return acc + `${error.msg} & `;
        }, "");
        errorMsg = errorMsg.slice(0, -2);
      }
      Swal.fire("Login Gagal", errorMsg, "error");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Belum memiliki akun? Daftar disini!</a>
      </div>
    </div>
  );
};

export default LoginPage;
