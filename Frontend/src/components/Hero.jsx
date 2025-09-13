import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">
        Smart Lost & Found System
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Report your lost items, find missing belongings, and help others.
      </p>
      <div className="space-x-4">
        <Link
          to="/report"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Report Lost Item
        </Link>
        <Link
          to="/found"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
        >
          View Found Items
        </Link>
      </div>
    </section>
  );
}
