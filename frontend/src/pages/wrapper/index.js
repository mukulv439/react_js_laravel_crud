import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Admin from '../admin';
import User from '../user'

function wrapper() {
    var role = localStorage.getItem('role');

    return (
        <div>
            <Routes>
                {
                    role = "admin" && <Route path='/admin/*' element={<Admin />} />
                }
<Route path='/users/*' element={<User />} />


            </Routes></div>
    )
}

export default wrapper