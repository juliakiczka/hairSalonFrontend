import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HolidaysPage() {
  const [filterDate, setFilterDate] = useState("");
  const [holidays, setHolidays] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  const parseDate = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month - 1, day);
  };

  const filteredHolidays = holidays.filter((holiday) => {
    if (!filterDate) return true; 

    const holidayStart = parseDate(holiday.startDate);
    const holidayEnd = parseDate(holiday.endDate);
    const filterDateObj = parseDate(filterDate);

    return filterDateObj >= holidayStart && filterDateObj <= holidayEnd;
  });

  const clearFilter = () => {
    setFilterDate("");
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/holidays/"); 
        setHolidays(response.data);  
        setLoading(false);
      } catch (err) {
        setError("Nie udało się pobrać urlopów.");
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="holidays-page">
      <h1 className="holidays-title">Urlopy</h1>

      <div className="filter-container">
        <label htmlFor="filter-date" className="filter-label">Filtruj po dacie:</label>
        <input
          type="date"
          id="filter-date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        
        <button onClick={clearFilter} className="clear-filter-button">
          Wyczyść filtr
        </button>
      </div>

      {loading ? (
        <p>Ładowanie urlopów...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table className="holidays-table">
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
              <th>Typ urlopu</th>
            </tr>
          </thead>
          <tbody>
            {filteredHolidays.map((holiday, index) => (
              <tr key={index}>
                <td>{holiday.user?.firstName} {holiday.user?.lastName}</td>
                <td>{holiday.startDate}</td>
                <td>{holiday.endDate}</td>
                <td>{holiday.leaveType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/" className="back-to-home">
        <span>Powrót do strony głównej</span>
      </Link>
    </div>
  );
}

export default HolidaysPage;
