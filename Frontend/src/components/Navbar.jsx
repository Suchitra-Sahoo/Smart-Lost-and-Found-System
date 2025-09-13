import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lost & Found</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/report" className="hover:text-gray-200">
            Report Item
          </Link>
          <Link to="/found" className="hover:text-gray-200">
            Found Items
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
