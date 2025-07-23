import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ApiRoutes } from "../../../constant";
import { UserContext } from "../../context/UserContext";

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isUser } = useContext(UserContext); // current logged-in user

  const [book, setBook] = useState(null);
  const [loader, setLoader] = useState(true);
  console.log("book =>", book);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${ApiRoutes.books.getBooks}/${id}`);
        const data = await res.json();
        console.log(data.data);
        setBook(data.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoader(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${ApiRoutes.books.getBooks}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (!data.error) {
        alert("Book deleted successfully!");
        navigate("/");
      } else {
        alert("Failed to delete: " + data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    navigate(`/books/edit/${id}`);
  };

  if (loader) return <p className="p-4">Loading...</p>;
  if (!book) return <p className="p-4">Book not found.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="mb-2">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="mb-2">
        <strong>Genre:</strong> {book.genre}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {book.description}
      </p>
      <p className="mb-2">
        <strong>Published Year:</strong>{" "}
        {new Date(book.publishedYear).getFullYear()}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookDetailPage;
