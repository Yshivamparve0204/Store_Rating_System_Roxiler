import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

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
          placeholder="Address"
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value
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

        <button type="submit">
          Register
        </button>

      </form>

      <Link to="/login">
        Already have an account?
      </Link>

    </div>
  );
};

export default Register;