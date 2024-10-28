import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

const GUTENBERG_API_URL = "https://gutendex.com/books?search=";

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("adventure");
  const [resultTitle, setResultTitle] = useState("Popular Books");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${GUTENBERG_API_URL}${searchTerm}`);
        const data = await response.json();

        if (data && data.results) {
          const formattedBooks = data.results.map(book => ({
            id: book.id,
            title: book.title,
            author: book.authors.length > 0 ? book.authors.map(author => author.name).join(", ") : "Unknown Author",
            cover_img: book.formats["image/jpeg"] || null,
            download_url: book.formats["text/html"] || book.formats["application/pdf"],
            first_publish_year: book.created ? book.created.split("-")[0] : "Unknown",
          }));
          setBooks(formattedBooks);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching from Gutenberg API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ books, loading, resultTitle, setSearchTerm, setResultTitle }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
