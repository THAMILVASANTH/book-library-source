// Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import imgbook from '../../images/library-img.jpg';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook for navigation

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission for signup
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form validation or any other logic here
    console.log('Signing up with:', formData);

    // Navigate to the login page after successful signup
    navigate('/login'); // Change this to the login route
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src={imgbook} alt="Signup" />
      </div>
      <div className="auth-form-container">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p className="toggle-text">
          Already have an account? 
          <Link to="/login" className="toggle-link"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
