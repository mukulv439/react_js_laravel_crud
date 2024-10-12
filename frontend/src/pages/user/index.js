

import {Routes, Route, Link, useNavigate } from "react-router-dom";
import List from './List'


function User() {
  const navigate= useNavigate();
  const role= localStorage.getItem('role');
  const handlelog= ()=>
  {
    navigate('/login')
    localStorage.clear();
   
    
  }
  return (
    <div>
    <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={"/users"} className="nav-link">Home</Link>
          </li>
       

        
          <li className='nav-item'>
            <Link to={"#"} className="nav-link">Role:{role}</Link>
          </li>
          <li className='nav-item' onClick={handlelog}>
            <Link to={"#"} className="nav-link">Logout</Link>
          </li>
        
        

        </div>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<List />} />
      
        </Routes>
      </div>
    </div>
  );
}

export default User;