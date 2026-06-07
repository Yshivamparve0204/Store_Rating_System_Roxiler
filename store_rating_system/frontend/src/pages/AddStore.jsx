import { useState } from "react";
import axios from "axios";

function AddStore() {

  const [form,setForm] = useState({
    name:"",
    email:"",
    address:"",
    ownerId:""
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
        "http://localhost:5000/api/stores",
        form,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Store Added Successfully");

      setForm({
        name:"",
        email:"",
        address:"",
        ownerId:""
      });

    }catch(error){
      alert(error.response?.data?.message || "Error");
    }
  };

  return(
    <div className="container">

      <h2>Add Store</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Store Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Store Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="ownerId"
          placeholder="Owner ID"
          value={form.ownerId}
          onChange={handleChange}
        />

        <button type="submit">
          Add Store
        </button>

      </form>

    </div>
  );
}

export default AddStore;