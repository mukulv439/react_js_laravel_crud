import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Wrapper from "./pages/wrapper"; // Correct the import name to match your component file

function App() {
  const isAuthenticated = localStorage.getItem('islogin');


  return (
    <div>
      <div className='container'>
        <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
     
          {/* Protected routes for authenticated users */}
          <Route path="/*" element={isAuthenticated ? <Wrapper /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
