export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-10">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Report Lost Items</h4>
            <p className="text-gray-600">
              Easily report your lost belongings with details and pictures.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Search Found Items</h4>
            <p className="text-gray-600">
              Browse items found by others and reconnect with your belongings.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-semibold mb-2">Secure Platform</h4>
            <p className="text-gray-600">
              Built with authentication and secure storage to protect data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
