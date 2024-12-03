// src/pages/SignUp.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Aggiunto campo per conferma password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Controllo che le password corrispondano
    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Reindirizza alla pagina di login dopo la registrazione
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Registrati</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Conferma Password"
          required
        />
        <button type="submit">Registrati</button>
      </form>
      <p>
        Hai già un account? <Link to="/login">Accedi</Link>
      </p>
    </div>
  );
}
