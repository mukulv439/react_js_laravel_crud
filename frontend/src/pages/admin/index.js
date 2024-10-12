

import {Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from './home'
import Create from './create'
import Edit from './edit'
import View from './view'

function Admin() {
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
            <Link to={"/admin"} className="nav-link">Home</Link>
          </li>
          <li className='nav-item'>
            <Link to={"/admin/create"} className="nav-link">Create</Link>
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
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;