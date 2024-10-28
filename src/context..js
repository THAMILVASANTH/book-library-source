import React, { useState, useContext, useEffect, useCallback } from 'react';
const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const { items } = data;

            if (items) {
                const newBooks = items.slice(0, 20).map((bookSingle) => {
                    const { id, volumeInfo } = bookSingle;
                    const { authors, imageLinks, title, publishedDate, description } = volumeInfo;

                    return {
                        id: id,
                        author: authors ? authors.join(', ') : "Unknown Author",
                        cover_img: imageLinks ? imageLinks.thumbnail : null,
                        title: title,
                        publishedDate: publishedDate || "Unknown Date",
                        description: description || "No description available",
                    };
                });

                setBooks(newBooks);

                if (newBooks.length > 0) {
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!");
                }
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    return (
        <AppContext.Provider value={{
            loading, books, setSearchTerm, resultTitle, setResultTitle,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
