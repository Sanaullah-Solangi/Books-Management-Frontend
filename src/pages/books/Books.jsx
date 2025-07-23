// src/pages/BooksPage.jsx
import React, { useEffect, useState } from "react";
import { ApiRoutes } from "../../../constant";
import { Link } from "react-router-dom";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoader(true);
        const res = await fetch(ApiRoutes.books.getBooks);
        const data = await res.json();
        setBooks(data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">Genre: {book.genre}</p>
                <p className="text-gray-700">
                  Year: {new Date(book.publishedYear).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksPage;
