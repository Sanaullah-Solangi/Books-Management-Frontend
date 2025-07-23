import { useState, useEffect } from "react";

function BookForm({ initialData = {}, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    description: initialData.description || "",
    genre: initialData.genre || "",
    publishedYear: initialData.publishedYear || "",
  });

  // useEffect(() => {
  //   if (initialData) {
  //     setFormData({
  //       title: initialData.title || "",
  //       author: initialData.author || "",
  //       description: initialData.description || "",
  //       genre: initialData.genre || "",
  //       publishedYear: initialData.publishedYear
  //         ? new Date(initialData.publishedYear).getFullYear()
  //         : "",
  //     });
  //   }
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        name="publishedYear"
        placeholder="Published Year"
        value={formData.publishedYear}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        rows="4"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default BookForm;
