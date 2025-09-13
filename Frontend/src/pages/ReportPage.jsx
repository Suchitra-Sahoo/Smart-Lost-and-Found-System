import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReportPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Report Lost Item
        </h2>
        <p className="text-gray-600">
          Here you can submit details about your lost item.
        </p>
        {/* Later you can add a form here */}
      </div>
      <Footer />
    </>
  );
}
