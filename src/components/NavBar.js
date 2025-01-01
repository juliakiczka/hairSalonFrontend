import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/bookings" className="tab">Rezerwacje</Link>
      <Link to="/users" className="tab">Użytkownicy</Link>
      <Link to="/holidays" className="tab">Urlopy</Link>
    </nav>
  );
}

export default Navbar;
