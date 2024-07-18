import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Logo from "../assets/logo.png";
import { FaSearch, FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import Login from "./loginmodal/Login";
const textNavbar = {
  paginaAcasa: "ACASA",
  paginaDespre: "DESPRE",
  paginaMeciuri: "MECIURI",
  paginaNoutati: "NOUTĂȚI",
  paginaEchipa: "ECHIPA",
  paginaJuniori: "JUNIORI",
  placeholderSearch: "Căutați",
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const updateLoggedInState = (value) => {
    setLoggedIn(value);
  };

  useEffect(() => {
    const storedAdminState = localStorage.getItem("isAdmin");
    if (storedAdminState) {
      setAdmin(JSON.parse(storedAdminState));
    }
  }, []);

  const updateAdminButtonState = (value) => {
    setAdmin(value);
    localStorage.setItem("isAdmin", JSON.stringify(value));
  };

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = (isOpen, username, password) => {
    setShowLogin(isOpen);
    if (isOpen) {
      console.log("Username:", username);
      console.log("Password:", password);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setAdmin(false);
    const isInAdminPage = window.location.pathname === "/administrator";
    if (isInAdminPage) {
      window.location.href = "/home";
    }
  };


  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 869) && (
        <ul className={`list ${toggleMenu ? "active" : ""}`}>
          <li className="transparent-background">
            <a href="/home" className="logo">
              <img className="imagine" src={Logo} alt="logo" />
            </a>
          </li>
          <li>
            <a href="/home">{textNavbar.paginaAcasa}</a>
          </li>
          <li>
            <a href="/despre">{textNavbar.paginaDespre}</a>
          </li>
          <li>
            <a href="/meciuri">{textNavbar.paginaMeciuri}</a>
          </li>
          <li>
            <a href="/noutati">{textNavbar.paginaNoutati}</a>
          </li>
          <li>
            <a href="/echipa">{textNavbar.paginaEchipa}</a>
          </li>
          <li>
            <a href="/juniori">{textNavbar.paginaJuniori}</a>
          </li>
          {isAdmin && (
            <li>
              <a href="/administrator">ADMIN</a>
            </li>
          )}

          <li>
            <div className="searchBox">
              <input
                type="text"
                className="searchInput"
                id="searchInput"
                name="searchInput"
                placeholder={textNavbar.placeholderSearch}
              />
              <button className="searchButton">
                <FaSearch />
              </button>
            </div>
          </li>

          <li>
            <div className="login">
              {isAdmin ? (
                <button
                  onClick={handleLogout}
                  id="loginButton"
                  name="loginButton"
                >
                  <FaSignOutAlt />
                </button>
              ) : (
                <button
                  onClick={toggleLogin}
                  id="loginButton"
                  name="loginButton"
                >
                  {loggedIn ? <FaSignOutAlt /> : <FaUser />}
                </button>
              )}
            </div>
          </li>
        </ul>
      )}

      {showLogin && (
        <div>
          <Login
            handleLogin={handleLogin}
            updateAdminButtonState={updateAdminButtonState}
          />
        </div>
      )}

      {screenWidth <= 868 && (
        <div>
          <button
            onClick={toggleNav}
            className={`btn meniu ${toggleMenu ? "active" : ""}`}
          >
            <FaBars />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
