import {
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Stores from "./pages/Store";
import OwnerDashboard from "./pages/OwnerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Store from "./pages/Store";

import AddStore from "./pages/AddStore";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

function App() {

  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute>
            <Store/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
 path="/add-store"
 element={<AddStore />}
/>

<Route
 path="/add-user"
 element={<AddUser />}
/>

<Route
 path="/users"
 element={<Users />}
/>

<Route
 path="/users/:id"
 element={<UserDetails />}
/>

    </Routes>
  );
}

export default App;