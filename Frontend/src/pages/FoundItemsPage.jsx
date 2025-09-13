import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FoundItemsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Found Items</h2>
        <p className="text-gray-600">
          Browse the list of items found by others.
        </p>
        {/* Later you can display items here */}
      </div>
      <Footer />
    </>
  );
}
