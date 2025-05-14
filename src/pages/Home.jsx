import { useEffect, useState } from "react";
import { getProducts } from "../utils/storage";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(null);
  const product = products.find((p) => p.id === id);
  console.log(product);
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="px-10">
      <h2 className="text-2xl uppercase font-bold text-center my-3">
        Our Products
      </h2>
      <hr />
      <div className="flex flex-wrap gap-4 items-center mt-7">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-60 h-auto border-1 border-gray-300 p-3"
          >
            <img src={p.imageUrl} alt={p.title} className="w-full h-40 " />
            <strong>{p.title}</strong>
            <div>
              <p className="h-12 overflow-hidden">{p.description}</p>
              <span>...</span>
            </div>
            <div className="flex justify-between items-center">
            <p className="text-gray-500">₹{p.price}</p>
            <button onClick={() => setId(p.id)} className="cursor-pointer text-[#89b400]">View Details</button>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-[100vh] bg-[#000000bf]  bg-opacity-50 flex items-center justify-center ${
          id ? "visible" : "invisible"
        }`}
      >
        <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-bold mb-4">{product?.title}</h2>
          <img
            src={product?.imageUrl}
            alt={product?.title}
            className="w-full h-40 mb-4 object-cover"
          />
          <p className="text-gray-700 mb-4">{product?.description}</p>
          <p className="text-gray-500 mb-4">Price: ₹{product?.price}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setId(null)}
              className="bg-red-500 text-white px-4 py-2 "
            >
              Close
            </button>
            <a
              href={`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in ${product?.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 px-4 py-2 text-white"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
