// src/App.jsx

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;