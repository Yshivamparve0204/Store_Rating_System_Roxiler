import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (
    <nav>

      <h2>Store Rating System</h2>

      <div>

        {role === "ADMIN" &&
          <button
            onClick={() =>
              navigate("/admin")
            }
          >
            Dashboard
          </button>
        }

        {role === "OWNER" &&
          <button
            onClick={() =>
              navigate("/owner")
            }
          >
            Owner Dashboard
          </button>
        }

        <button
          onClick={() =>
            navigate("/stores")
          }
        >
          Stores
        </button>

        <button
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;