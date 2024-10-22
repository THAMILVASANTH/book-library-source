import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHeaven</h2>
            <p className='fs-17'>A library is a place where books and other materials, such as periodicals, magazines, and digital media, are organized and made available for people to read, borrow, or research. It serves as a resource hub for learning, education, and information access. Libraries often offer a wide variety of books across different genres—fiction, non-fiction, science, history, and more—caters to people of all ages and interests.</p>
            <p className='fs-17'>Modern libraries also provide services like study spaces, community programs, internet access, and online resources such as e-books and databases. Many libraries have systems in place for cataloging and borrowing materials, with librarians available to assist visitors in finding information or recommending reading materials.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
