import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../app/app.slice";

import logo from "./../../assets/vite.svg";

const Navbar = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.app.isAuth);

  return (
    <nav style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Logo" style={styles.logoImage} />
        </Link>
      </div>

      {/* Right Aligned Links */}
      <div style={styles.navItems}>
        {isAuth ? (
          <span style={styles.logout} onClick={() => dispatch(logout())}>
            Log Out
          </span>
        ) : (
          <Link to="/dash" style={styles.link}>
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    position: "fixed",
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0)",
    zIndex: 1,
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "40px",
  },
  navItems: {
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#bbbbbb",
  },
  logout: {
    color: "#bbbbbb",
    cursor: "pointer",
  },
};

export default Navbar;
