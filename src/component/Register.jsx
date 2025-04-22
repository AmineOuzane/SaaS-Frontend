import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    telephone: '',
    companyname: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({}); // State for validation errors

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
        // Make API call to your backend (replace with your actual endpoint)
        const response = await axios.post('http://localhost:8083/registerClient', formData); // Send the entire formData object

        console.log('Client created successfully:', response.data);
        alert('Registration successful!'); // Give user feedback

        // Reset the form after successful submission
        setFormData({
          username: '',
          telephone: '',
          companyname: '',
          email: '',
          password: '',
          confirm_password: '',
        });
        setErrors({}); // Clear errors
      } catch (error) {
        console.error('Error creating client:', error.response ? error.response.data : error.message);
        // Display error message to the user
        alert(`Registration failed: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
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
    if (!data.telephone) {
      errors.telephone = 'Phone Number is required';
    }
    if (!data.companyname) {
      errors.companyname = 'Company Name is required';
    }
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!data.confirm_password) {
      errors.confirm_password = 'Confirm Password is required';
    } else if (data.password !== data.confirm_password) {
      errors.confirm_password = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>Register</h1>
        <p>Create your account</p>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="telephone">Phone Number:</label>
            <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
            {errors.telephone && <p className="error-message">{errors.telephone}</p>}
          </div>
          <div>
            <label htmlFor="companyname">Company Name:</label>
            <input type="text" id="companyname" name="companyname" value={formData.companyname} onChange={handleChange} />
            {errors.companyname && <p className="error-message">{errors.companyname}</p>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
            {errors.confirm_password && <p className="error-message">{errors.confirm_password}</p>}
          </div>
          
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;