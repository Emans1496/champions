import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../components/style/SignUp.scss";
import championsLogo from "../assets/img/champions logo.png";
import { CSSTransition } from "react-transition-group";
import video from "../assets/video/bg.mp4";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Le password non corrispondono.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const scrollToSection = () => {
    const section = document.querySelector(".signup-page");
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
            style={{ width: "500px", marginBottom: "50px" }}
          />
          <h1>The Football Card Game</h1>
          <p>
            Discover the amazing game of football with this innovative card
            game.
          </p>
          <p style={{color: "#ADF130"}}>Ready to play? Sign up now!</p>
          <button onClick={scrollToSection} className="signup-button">SignUp</button>
        </div>
      </div>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="signup-page">
          <div className="registrazione">
            <img src={championsLogo} alt="logo" style={{ width: "250px" }} />
            <h1>SignUp</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignUp} className="signup-form">
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
              <button type="submit" className="signup-button">
                SignUp
              </button>
            </form>
            <p>
              Do you already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
