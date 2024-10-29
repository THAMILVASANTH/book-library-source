// Login.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import imgbook from '../../images/library-img.jpg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const email = event.target.email.value; // Get email from input
    const password = event.target.password.value; // Get password from input

    // You would typically validate the credentials here (e.g., API call)
    // For demonstration, we'll assume successful login

    // Store user's email in local storage (you can adjust what you store)
    localStorage.setItem('user', JSON.stringify({ email }));
    console.log('Logging in with email:', email, 'and password:', password);
    // Navigate to home page after login
    navigate('/'); // Change this to your actual home route
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src={imgbook} alt="Login" />
      </div>
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="toggle-text">
          Don't have an account? 
          <Link to="/signup" className="toggle-link"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
