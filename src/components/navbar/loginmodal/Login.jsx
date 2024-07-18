import React, { useState } from "react";
import "../loginmodal/Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginimage from "../../assets/loginImg.png";
import SignUp from "../signupmodal/Signup";

const roluri = {
  admin: 'ROLE_ADMIN',
  creatorContinut: 'ROLE_CREATOR_CONTINUT',
  user: 'ROLE_USER'
};

const PasswordVisibility = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
};

const Login = ({ handleLogin, updateAdminButtonState }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState(PasswordVisibility.HIDDEN);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === PasswordVisibility.HIDDEN
        ? PasswordVisibility.VISIBLE
        : PasswordVisibility.HIDDEN
    );
  };

  const openSignUpModal = () => {
    setShowSignUp(true);
  };

  const closeSignUpModal = () => {
    setShowSignUp(false);
  };

  const handleLoginRequest = async (userData) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("localStorage: " + localStorage.token);

      return token;
    } catch (error) {
      console.error("Eroare în timpul cererii de autentificare:", error);
      setLoginError("Utilizatorul sau parola sunt incorecte.");
      throw error;
    }
  };

  const handleGetUserDataRequest = async (token) => {
    try {
      const authenticatedHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const anotherResponse = await fetch("http://localhost:5050/api/loggeduser/details", {
        method: "GET",
        headers: authenticatedHeaders,
        mode: 'cors',
      });

      if (!anotherResponse.ok) {
        if (anotherResponse.status === 404) {
          setLoginError("Utilizatorul nu a fost găsit.");
        } else {
          setLoginError("A apărut o eroare în timpul cererii.");
        }
        throw new Error("Network response was not ok.");
      }

      const anotherData = await anotherResponse.json();
      console.log("Răspuns de la alt endpoint (conținut):", anotherData);

      updateAdminButtonState(anotherData.role.name === roluri.admin);

      return anotherData;
    } catch (error) {
      console.error("Eroare în timpul cererii către alt endpoint:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        username,
        password,
      };

      const token = await handleLoginRequest(userData);

      const userDataResponse = await handleGetUserDataRequest(token);
      handleLogin(false);
    } catch (error) {
      if (error.response) {
        console.error("Răspuns de la server (eroare):", error.response.data);
      }
    }
  };

  const closeErrorMessage = () => {
    setLoginError(null);
  };

  

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => handleLogin(false)}>
          &times;
        </span>
        <div className="loginimage">
          <img src={loginimage} alt="loginimage" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="username-container">
            <label htmlFor="username">Utilizator</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-username"
              placeholder="Introdu username-ul"
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">Parolă</label>
            <div className="password-input-container">
              <input
                type={passwordVisibility === PasswordVisibility.VISIBLE ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-password"
                required
                placeholder="Introdu parola"
                
              />
              <button
                type="button"
                className="parola-buton"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={passwordVisibility === PasswordVisibility.VISIBLE ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="container-butoane-login">
            <button
              type="button"
              className="butoane-logare"
              onClick={openSignUpModal}
            >
              Înregistrează-te <FontAwesomeIcon icon={faUserPlus} />
            </button>
            <button type="submit" className="butoane-logare">
              Conectează-te
              <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </div>
        </form>
      </div>
      {showSignUp && <SignUp handleSwitchToLogin={closeSignUpModal} />}
      {loginError && (
        <div className="error-popup">
          <p>{loginError}</p>
          <button onClick={closeErrorMessage}>Închide</button>
        </div>
      )}
    </div>
  );
};

export default Login;
