export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Smart Lost & Found System. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
