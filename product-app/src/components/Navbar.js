import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 py-4">
      <div className="max-w-4xl mx-auto flex justify-center">
        <div className="flex gap-20">
          <Link
            to="/"
            className="text-white font-medium px-4 py-2 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/add-product"
            className="text-white font-medium px-4 py-2 hover:underline"
          >
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}
