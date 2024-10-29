import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        {/* Main Route for Home and Nested Routes */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="book" element={<BookList />} />
        <Route path="book/:id" element={<BookDetails />} />

        {/* Routes for Login and Signup */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
