import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const GUTENBERG_API_URL = "https://gutendex.com/books/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${GUTENBERG_API_URL}${id}`);
        const data = await response.json();

        if (data) {
          const { title, authors, formats, subjects, bookshelves } = data;
          const newBook = {
            title: title,
            author: authors.length > 0 ? authors.map(author => author.name).join(", ") : "Unknown Author",
            cover_img: formats["image/jpeg"] || coverImg,
            view_url: formats["text/html"] || formats["text/plain"],
            download_url: formats["application/pdf"] || formats["text/plain"],
            subjects: subjects ? subjects.join(", ") : "No subjects available",
            bookshelves: bookshelves ? bookshelves.join(", ") : "No categories available",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };
    fetchBookDetails();
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
            <img src={book?.cover_img} alt="cover" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>Author: {book?.author}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Categories: </span>
              <span>{book?.bookshelves}</span>
            </div>
            {book?.view_url && (
              <div className='book-details-actions'>
                <a href={book.view_url} target="_blank" rel="noopener noreferrer" className='btn btn-view'>
                  View Book
                </a>
              </div>
            )}
            {book?.download_url && (
              <div className='book-details-actions'>
                <a href={book.download_url} download className='btn btn-download'>
                  Download Book
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
