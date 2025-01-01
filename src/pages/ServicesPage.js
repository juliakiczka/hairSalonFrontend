import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ServicesPage() {
  const [services, setServices] = useState([]);  
  const [sortOrder, setSortOrder] = useState("asc");  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/services/")  
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Błąd pobierania usług");
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  const sortServices = (order) => {
    return [...services].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
  };

  const sortedServices = sortServices(sortOrder);

  if (loading) {
    return <div>Ładowanie usług...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd: {error}</div>;
  }

  return (
    <div className="services-page">
      <h1 className="services-title">Usługi</h1>

      <div className="filter-container">
        <label htmlFor="price-filter" className="filter-label">Sortuj po cenie:</label>
        <select
          id="price-filter"
          className="filter-input"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Cena rosnąco</option>
          <option value="desc">Cena malejąco</option>
        </select>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>Usługa</th>
            <th>Cena</th>
            <th>Średni czas trwania</th>
          </tr>
        </thead>
        <tbody>
          {sortedServices.map((service, index) => (
            <tr key={index}>
              <td>{service.serviceName}</td>
              <td>{service.price} PLN</td>
              <td>{service.averageDuration} h</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/" className="back-to-home">
        <span>Powrót do strony głównej</span>
      </Link>
    </div>
  );
}

export default ServicesPage;
