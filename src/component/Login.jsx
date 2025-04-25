import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../src/styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const API_BASE_URL = 'http://localhost:8083'; // à ajuster si nécessaire

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
        // Convertir les données en format application/x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('username', formData.username);
        params.append('password', formData.password);

        const response = await axios.post(`${API_BASE_URL}/auth/login`, params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.data && response.data.access_token) {
          // Stocker le JWT dans localStorage
          localStorage.setItem('access_token', response.data.access_token);
          alert('Login successful!');
          window.location.href = '/'; // Redirection vers la page d'accueil ou la page protégée
        } else {
          alert('Login failed: No token received');
        }

        setFormData({
          username: '',
          password: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        alert(`Login failed: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
      }
    } else {
      console.log('Form has errors');
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.username) {
      errors.username = 'Username is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <p>Welcome back!</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
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
    </div>
  );
};

export default Login;
