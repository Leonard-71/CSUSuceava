import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../signupmodal/Signup.scss";

const SignUp = ({ handleSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [nume, setFirstName] = useState("");
  const [prenume, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PasswordVisibility = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
  };
  

  const [passwordVisibility, setPasswordVisibility] = useState(
    PasswordVisibility.HIDDEN
  );

  const togglePasswordVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === PasswordVisibility.HIDDEN
        ? PasswordVisibility.VISIBLE
        : PasswordVisibility.HIDDEN
    );
  };

  const textSignUp = {
    inregistreazate: "Înregistrează-te",
    placeholderusername: "Introdu username-ul",
    placeholderfirstname: "Introdu numele",
    placeholderlastname: "Introdu prenumele",
    placeholderemail: "Introdu adresa de email",
    placeholderpassword: "Introdu parola",
  };

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        nume,
        prenume,
        username,
        password,
      };

      const response = await fetch("http://localhost:5050/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.text();
      console.log("Răspuns de la server:", data);
      resetForm();
    } catch (error) {
      console.error("Eroare în timpul cererii:", error);
    }
  };

  return (
    <div className="modal-signup">
      <div className="modal-content-signup">
        <span className="close" onClick={() => handleSwitchToLogin()}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="username-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={textSignUp.placeholderusername}
              />
            </div>
            <div className="firstname-container">
              <label htmlFor="nume">Nume</label>
              <input
                type="text"
                id="nume"
                value={nume}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder={textSignUp.placeholderfirstname}
              />
            </div>
            <div className="lastname-container">
              <label htmlFor="prenume">Prenume</label>
              <input
                type="text"
                id="prenume"
                value={prenume}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder={textSignUp.placeholderlastname}
              />
            </div>

            <div className="password-container">
              <label htmlFor="password">Parolă</label>

              <input
                type={
                  passwordVisibility === PasswordVisibility.VISIBLE
                    ? "text"
                    : "password"
                }
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-password"
                required
                placeholder={textSignUp.placeholderpassword}
              />
              <button
                type="button"
                className="parola-buton"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={
                    passwordVisibility === PasswordVisibility.VISIBLE
                      ? faEyeSlash
                      : faEye
                  }
                />
              </button>
            </div>
          </div>
          <div className="container-butoane-login">
            <button type="submit" className="butoane-logare">
              {textSignUp.inregistreazate} <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
