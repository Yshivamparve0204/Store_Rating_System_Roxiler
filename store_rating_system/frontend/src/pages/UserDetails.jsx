import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function UserDetails(){

  const {id}=useParams();

  const [user,setUser]=useState(null);

  useEffect(()=>{

    loadUser();

  },[]);

  const loadUser=async()=>{

    const res=await axios.get(
      `http://localhost:5000/api/users/${id}`,
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    setUser(res.data);

  };

  if(!user){
    return <h3>Loading...</h3>;
  }

  return(

    <div className="container">

      <div className="card">

        <h2>{user.name}</h2>

        <p>Email : {user.email}</p>

        <p>Address : {user.address}</p>

        <p>Role : {user.role}</p>

        {user.averageRating && (
          <p>
            Average Rating :
            {user.averageRating}
          </p>
        )}

      </div>

    </div>

  );

}

export default UserDetails;