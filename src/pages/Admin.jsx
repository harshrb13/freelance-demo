import { useState, useEffect } from "react";
import { getProducts, saveProducts } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export default function Admin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    pdfUrl: "",
    id: null,
  });
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageName, setImageName] = useState("No image selected");
  const [pdfName, setPdfName] = useState("No PDF selected");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (form.id) {
      updated = products.map((p) => (p.id === form.id ? form : p));
    } else {
      updated = [...products, { ...form, id: uuidv4() }];
    }
    setOpen((prev) => !prev);
    setProducts(updated);
    saveProducts(updated);
    setForm({ title: "", description: "", price: "", imageUrl: "", id: null });
  };

  const handleEdit = (product) => {
    setOpen((prev) => !prev);
    setForm(product);
  };

  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imageUrl: reader.result }); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfName(file.name);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, pdfUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handlePopUp = () => {
    setOpen((prev) => !prev);
    setForm({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      pdfUrl: "",
      id: null,
    });
    setImageName("No image selected");
    setPdfName("No PDF selected");
  };

  return (
    <div className="relative mx-10">
      <h2 className="text-2xl font-bold my-3">Admin Panel</h2>
      <div
        className={`z-90 absolute bg-black text-white top-0 left-[50%] translate-x-[-50%] w-[35%] max-w-[600px] p-4 rounded-lg shadow-lg ${
          open ? "block" : "hidden"
        }`}
      >
        <div>
          <h3 className="text-xl font-bold mb-1 text-center">
            {form.id ? "Update Product" : "Add Product"}
          </h3>
          <button
            onClick={handlePopUp}
            className="absolute top-0.5 right-3 cursor-pointer text-gray-500"
          >
            x
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-3">
          <input
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            className="p-2 outline-none border-b-2 border-gray-300 mb-2 bg-[#1d1d1d]"
          />
          <input
            name="price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Price"
            className="p-2 outline-none border-b-2 border-gray-300 mb-2 bg-[#1d1d1d]"
          />
          <textarea
            name=""
            placeholder="Description"
            id=""
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={200}
            className="p-2 outline-none min-h-[150px] max-h-[150px] bg-[#1d1d1d] mb-2"
          />
          <label
            htmlFor="image"
            className="p-2 capitalize outline-none border-b-2 border-gray-300 mb-2 bg-[#1d1d1d]"
          >
            upload image
            <span className="px-2 lowercase text-gray-500">{imageName}</span>
          </label>
          <input
            placeholder="upload"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="pdf"
            className="p-2 outline-none border-b-2 border-gray-300 mb-2 bg-[#1d1d1d]"
          >
            Upload PDF
            <span className="px-2 lowercase text-gray-500">{pdfName}</span>
          </label>
          <input
            type="file"
            id="pdf"
            placeholder="upload"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="hidden"
          />
          <button className="bg-white text-black p-1" type="submit">
            {form.id ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <hr />
      <div className="my-3 flex justify-between">
        <h3>All Products</h3>
        <button
          onClick={handlePopUp}
          className="bg-black text-white p-2 rounded-sm uppercase text-sm"
        >
          Add Product+
        </button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-60 h-auto border-1 border-gray-300 p-3"
          >
            <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover" />
            <strong>{p.title}</strong>
            <div>
              <p className="h-12 overflow-hidden">{p.description}</p>
              <span>...</span>
            </div>
            <p className="text-gray-500">₹{p.price}</p>
            <div className="flex justify-between items-center mt-2">
              <button className="text-[#008381] cursor-pointer" onClick={() => handleEdit(p)}>
                Edit
              </button>
              <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                📄PDF
              </a>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
