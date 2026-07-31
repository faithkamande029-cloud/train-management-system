// src/layouts/MainLayout.jsx

import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;