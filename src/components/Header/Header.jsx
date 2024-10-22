import React from 'react';
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            <Navbar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
                <p className='header-text fs-18 fw-3'>Welcome to your digital haven for book lovers! Explore thousands of books across different genres, from fiction to non-fiction, all in one place. With personalized recommendations and an intuitive search, finding your next great read has never been easier.</p>
                <SearchForm />
            </div>
        </header>
    </div>
  )
}

export default Header