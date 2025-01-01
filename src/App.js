import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import salonImage from "./assets/image.png";

// Importy podstron
import BookingPage from "./pages/BookingPage";
import UsersPage from "./pages/UsersPage";
import HolidaysPage from "./pages/HolidaysPage";
import ServicesPage from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage"; // Formularz logowania

function App() {
  const [user, setUser] = useState(null); // Stan przechowujący zalogowanego użytkownika

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Funkcja sprawdzająca, czy użytkownik jest zalogowany
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" />; // Jeśli użytkownik nie jest zalogowany, przekieruj do logowania
    }

    if (allowedRoles && !allowedRoles.includes(user)) {
      return <Navigate to="/" />; // Jeśli użytkownik nie ma odpowiednich uprawnień, przekieruj na stronę główną
    }

    return children;
  };

  return (
    <Router>
      <AppContent
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        ProtectedRoute={ProtectedRoute}
      />
    </Router>
  );
}

function AppContent({ user, handleLogin, handleLogout, ProtectedRoute }) {
  const location = useLocation(); // Hook useLocation jest teraz w kontekście Router
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {/* Nawigacja - ukryta na stronie logowania */}
      {!isLoginPage && (
        <div className="navbar">
          {user ? (
            <>
              <Link to="/services" className="tab">Usługi</Link>
              {user === "admin" && (
                <>
                  <Link to="/bookings" className="tab">Rezerwacje</Link>
                  <Link to="/users" className="tab">Użytkownicy</Link>
                  <Link to="/holidays" className="tab">Urlopy</Link>
                </>
              )}
              <button onClick={handleLogout} className="logout-button">Wyloguj się</button>
            </>
          ) : (
            <Link to="/login" className="tab">Zaloguj się</Link>
          )}
        </div>
      )}

      {/* Zawartość główna */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="content">
              <img src={salonImage} alt="Narzędzia fryzjerskie" className="salon-image" />
              <h1 className="salon-title">Salon Fryzjerski</h1>
              <p className="salon-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Ochrona tras */}
        <Route
          path="/services"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/holidays"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <HolidaysPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
