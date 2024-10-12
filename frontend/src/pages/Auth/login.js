import React, { useState } from 'react';
import axios from 'axios';
import http from "../../http";
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =  await http.post('/login', credentials);
            const userData = response.data.user;
            localStorage.setItem('islogin','true');
            localStorage.setItem('user', JSON.stringify(userData)); // Store as a string
            localStorage.setItem('role', userData.role);
            if( response.data.user.role == "admin")
            {
                navigate('/admin')
            }
            else{
                navigate('/users')
            }
          
        
            alert('Login successful! Welcome, ' + userData.name);
    
        
        } catch (error) {
            if (error.response && error.response.data.errors) {
                // Alert the error message to the user
                alert("Login failed: " + error.response.data.errors.email[0]);
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div class="d-flex align-items-center justify-content-center v-50">
   <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <h2 class="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="email" name="email" class="form-control mb-2" onChange={handleChange} placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control mb-2" onChange={handleChange} placeholder="Password" required />
                    </div>
                    <div className='text-center'>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                    </div>
                 
                </form>
            </div>
        </div>
    </div>
    </div>
    );
};

export default Login;
