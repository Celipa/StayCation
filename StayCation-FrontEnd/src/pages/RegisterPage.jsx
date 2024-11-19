import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    if (!formData.confirmPassword.trim()) {
      setErrorMsg("Please confirm password!"); 
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!"); 
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const register = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await res.json(); // assign the result of res.json() to data
    
      console.log(data); // log data after it has been assigned a value
    
      if (res.status !== 201) {
        setErrorMsg(data.message);
      }
    
      if (res.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className='Register-container'>
      <form onSubmit={register} className="register-form">
        <h1>Sign up</h1>
        <label>
          First Name:
          <input type="text" name="firstName" autoComplete="on" onChange={handleInputChange} required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" autoComplete="on" onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" autoComplete="on" onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" autoComplete="off" onChange={handleInputChange} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" autoComplete="off" onChange={handleInputChange} required />
        </label>
        <input type="submit" value="Register" />
      </form>
      <div className='Error'>{errorMsg && <p>{errorMsg}</p>}</div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>Success!</h1>
            <p>Your account has been created.</p>
            <button onClick={() => {
              setShowModal(false);
              navigate('/login');
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;