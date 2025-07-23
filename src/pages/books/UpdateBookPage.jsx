import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../../constant";
import BookForm from "../../components/BookForm";

function UpdateBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${ApiRoutes.books.getBooks}/${id}`);
        const data = await res.json();
        setBook(data.data);
        console.log(data.data[0]);
        setBook(data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdateBook = async (updatedData) => {
    try {
      setLoading(true);
      const res = await fetch(`${ApiRoutes.books.getBooks}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!result.error) {
        alert("Book updated successfully!");
        navigate(`/books/${id}`);
      } else {
        alert("Failed: " + result.msg);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <p className="p-4">Loading book data...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Update Book</h1>
      <BookForm
        initialData={book}
        onSubmit={handleUpdateBook}
        loading={loading}
      />
    </div>
  );
}

export default UpdateBookPage;
