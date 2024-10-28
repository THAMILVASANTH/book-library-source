import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://www.googleapis.com/books/v1/volumes/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}`);
        const data = await response.json();

        if (data) {
          const { volumeInfo } = data;
          const { title, authors, description, imageLinks, categories, publishedDate } = volumeInfo;
          const newBook = {
            title: title,
            author: authors ? authors.join(", ") : "Unknown Author",
            description: description || "No description found",
            cover_img: imageLinks ? imageLinks.thumbnail : coverImg,
            categories: categories ? categories.join(", ") : "No categories found",
            publishedDate: publishedDate || "No published date available",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Categories: </span>
              <span className='text-italic'>{book?.categories}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Published Date: </span>
              <span>{book?.publishedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
