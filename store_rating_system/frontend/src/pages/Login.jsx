import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.role === "ADMIN")
        navigate("/admin");

      else if (res.data.role === "OWNER")
        navigate("/owner");

      else
        navigate("/stores");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button>
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;