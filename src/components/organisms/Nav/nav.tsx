import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from "../../../assets/logos/logo_unkle_version.svg";
import { authSelector } from "../../../store/auth/authSlice";

import "./_nav.scss";

const Nav = () => {
  const [open, setOpen] = useState(true);
  const [heightNav, setHeightNav] = useState("0%");
  const { currentUser } = useSelector(authSelector);

  const toggleNav = () => {
    setOpen(!open);
    if (open === true) {
      setHeightNav("100%");
    } else {
      setHeightNav("0%");
    }
  };

  const setOpenNav = () => {
    setOpen(true);
    toggleNav();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container_responsive">
      <nav>
        <Link to="/" onClick={() => scrollToTop()}>
          <div className="box_logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
        <div
          className={!open ? "nav_burger open" : "nav_burger"}
          onClick={() => toggleNav()}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div id="myNav" className="overlay" style={{ height: heightNav }}>
          <div className="links">
            {currentUser?.role === "admin" ? (
              <NavLink
                to="/usersList"
                onClick={() => {
                  setOpenNav();
                }}
              >
                Tous les utilisateurs
              </NavLink>
            ) : null}

            <button className="btn-nav--logout btn-nav--mobile primary-color primary-border">
              <span className="body-s--bold">Deconnexion</span>
            </button>
          </div>
        </div>
        <div className="nav_links_desktop">
          {currentUser?.role === "admin" ? (
            <NavLink to="/usersList">
              <h2 className="body-s primary-color"> Tous les utilisateurs</h2>
            </NavLink>
          ) : null}
          {currentUser && (
            <span className="body-s">Hello {currentUser.firstname} 👋</span>
          )}
          <button className="btn--rounded btn--rounded-primary">
            <span className="body-s--bold">Deconnexion</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
