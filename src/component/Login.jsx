import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '', // Combined field for username or email
    password: '',
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = 'http://localhost:8083'; // Make sure to adjust this if needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make API call to the login endpoint             the login is not yet configured 
        const response = await axios.post(`${API_BASE_URL}/login`, formData); 
        console.log('Login successful:', response.data);
        alert('Login successful!'); // Provide user feedback

        // Optionally, store the authentication token or user information
        // in local storage or a context provider.

        // Reset the form after successful submission
        setFormData({
          usernameOrEmail: '',
          password: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        // Provide user feedback
        alert(`Login failed: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      }
    } else {
      console.log('Form has errors');
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.usernameOrEmail) {
      errors.usernameOrEmail = 'Username or Email is required';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <p>Welcome back!</p>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="usernameOrEmail">Username or Email:</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
            />
            {errors.usernameOrEmail && <p className="error-message">{errors.usernameOrEmail}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link> 
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;