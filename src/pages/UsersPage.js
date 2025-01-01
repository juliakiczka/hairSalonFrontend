import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UsersPage() {
   
  const [filter, setFilter] = useState(""); 
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/"); 
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Nie udało się pobrać użytkowników.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.role.toLowerCase().includes(filter.toLowerCase())
  );

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <div className="users-page">
      <h1 className="users-title">Użytkownicy</h1>

      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">Filtruj po roli:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Wpisz rolę"
          className="filter-input"
        />
        
        <button onClick={clearFilter} className="clear-filter-button">
          Wyczyść filtr
        </button>
      </div>

      {loading ? (
        <p>Ładowanie użytkowników...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Rola</th>
            </tr>
          </thead>
          <tbody>
  {filteredUsers.map((user, index) => (
    <tr key={index}>
      <td>{user.fullName}</td>
      <td>{user.email}</td>
      <td>{user.role.toLowerCase()}</td>
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

export default UsersPage;
