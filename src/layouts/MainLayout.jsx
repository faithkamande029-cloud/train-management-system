// src/layouts/MainLayout.jsx

import Navbar from "../components/common/Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />
      <main className="p-6 flex-1">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;