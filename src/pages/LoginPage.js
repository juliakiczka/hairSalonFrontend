import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Sprawdzanie logowania
    if ((username === "user" && password === "user") || (username === "admin" && password === "admin")) {
      onLogin(username); // Przekazanie zalogowanego użytkownika do App.js
      navigate("/"); // Przekierowanie na stronę główną po zalogowaniu
    } else {
      alert("Nieprawidłowy login lub hasło");
    }
  };

  return (
    <div className="login-page">
      <h1>Logowanie</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Login"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          required
        />
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

export default LoginPage;
