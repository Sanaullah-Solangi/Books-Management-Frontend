import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../../constant";
import BookForm from "../../components/BookForm";

function AddBookPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddBook = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(ApiRoutes.books.getBooks, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.error) {
        alert("Book added successfully!");
        navigate("/");
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add New Book</h1>
      <BookForm onSubmit={handleAddBook} loading={loading} />
    </div>
  );
}

export default AddBookPage;
