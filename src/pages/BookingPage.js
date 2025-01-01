import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookingPage() {
  const [filterDate, setFilterDate] = useState(""); 
  const [bookings, setBookings] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings/");
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError("Nie udało się pobrać rezerwacji.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.date.includes(filterDate)
  );

  const clearFilter = () => {
    setFilterDate("");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("pl-PL");  
    const formattedTime = date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });  
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="booking-page">
      <h1 className="booking-title">Rezerwacje</h1>

      <div className="filter-container">
        <label htmlFor="filterDate" className="filter-label">
          Filtruj po dacie:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          placeholder="Wybierz datę"
          className="filter-input"
        />
        
        <button onClick={clearFilter} className="clear-filter-button">
          Wyczyść filtr
        </button>
      </div>

      {loading ? (
        <p>Ładowanie rezerwacji...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Data wizyty</th>
              <th>Typ usługi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.userName}</td>  
                  <td>{formatDate(booking.date)}</td>  
                  <td>{booking.serviceName}</td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  Brak rezerwacji na wybraną datę
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Link to="/" className="back-to-home">
        <span>Powrót do strony głównej</span>
      </Link>
    </div>
  );
}

export default BookingPage;
