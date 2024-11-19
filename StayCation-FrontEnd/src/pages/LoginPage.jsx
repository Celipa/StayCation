import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import UserContext from '../contexts/userContext';
import './css/Login.css';

function Login() {
  const { setUserId } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg("Please enter a valid email!"); 
      return false;
    }

    if (!formData.password.trim()) {
      setErrorMsg("Password cannot be empty!"); 
      return false;
    }

    setErrorMsg('');
    return true;
  };


  const logout = () => {
    // Clear user's session or authentication token
    localStorage.removeItem('token');
    // Update the isLoggedIn state
    setIsLoggedIn(false);
    // Redirect to login page
  };

  const login = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    if (localStorage.getItem('token')) {
      alert('You are already logged in!');
      setIsLoggedIn(true);
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.status !== 200) {
        setErrorMsg(data.message);
      }
  
      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        alert('You are now logged in!');
        navigate('/');
        console.log(data);
        setUserId(data.user._id);
        setIsLoggedIn(true);
      } 
    } catch (error) {
      setErrorMsg(error.message);
    }
  }


  return (
    <div className='Login'>
      <form onSubmit={login} className="login-form">
        <h1>Log in</h1>
        <label>
          Email:
          <input type="email" name="email" autoComplete="on" onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
        </label>
        <input type="submit" value="Log in" />
        
        
        <div>
          <li>Don't have an account?</li>
          <li><a href="/register">Register here</a></li>
        </div>
      </form>
      <Navbar logout={logout} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Login;