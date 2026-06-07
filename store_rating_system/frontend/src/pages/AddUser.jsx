import { useState } from "react";
import axios from "axios";

function AddUser(){

  const [form,setForm]=useState({
    name:"",
    email:"",
    address:"",
    password:"",
    role:"USER"
  });

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    try{

      await axios.post(
        "http://localhost:5000/api/users/add-user",
        form,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("User Created");

    }catch(error){
      alert(error.response?.data?.message);
    }

  };

  return(
    <div className="container">

      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="OWNER">OWNER</option>
        </select>

        <button>
          Create User
        </button>

      </form>

    </div>
  );
}

export default AddUser;