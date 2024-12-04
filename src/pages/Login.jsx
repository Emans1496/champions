// src/pages/Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../components/style/Login.scss";
import championsLogo from "../assets/img/champions logo.png";
import { CSSTransition } from "react-transition-group";
import video from "../assets/video/bg.mp4";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const scrollToSection = () => {
    const section = document.querySelector(".login-page");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="Hero">
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={video} type="video/mp4" />
          Il tuo browser non supporta i video HTML5.
        </video>
        <div className="content">
          <img
            src={championsLogo}
            alt="logo"
            className="signUpLogo"
          />
          <h1>The Football Card Game</h1>
          <p>
            Discover the amazing game of football with this innovative card
            game.
          </p>
          <p style={{ color: "#ADF130" }}>Ready to play? Sign in now!</p>
          <button onClick={scrollToSection} className="login-button">
            Login
          </button>
        </div>
      </div>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div>
          <div className="login">
            <div className="registrazione">
              <h1>Login</h1>
              {error && <p>{error}</p>}
              <form onSubmit={handleLogin} className="login-form">
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
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              <button onClick={handleGoogleSignIn} className="google-button">
                <img
                  src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png"
                  className="google-icon"
                />
                Login with Google
              </button>
              <p>
               Do not have an account? <Link to="/signup">SignUp</Link>
              </p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
