import { useState } from "react";
import API from "../api/axios";

const ChangePassword = () => {

  const [form, setForm] =
    useState({
      oldPassword: "",
      newPassword: ""
    });

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      await API.put(
        "/auth/change-password",
        form
      );

      alert(
        "Password Updated"
      );

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="container">

      <h2>
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        <input
          type="password"
          placeholder="Old Password"
          onChange={(e) =>
            setForm({
              ...form,
              oldPassword:
              e.target.value
            })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setForm({
              ...form,
              newPassword:
              e.target.value
            })
          }
        />

        <button>
          Update
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;