import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";
import "../components css/header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu, user, setUser, logoutUser } =
    useContext(Context);
  const navigate = useNavigate();

  const location = useLocation();
  const isSignUpPage = location.pathname === "/signUp";
  const isLoginPage = location.pathname === "/login";

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const openLoginPage = () => {
    setUser(true);
    navigate("/signUp");
  };

  return (
    <>
      {!isSignUpPage && !isLoginPage && (
        <div className="header-container">
          {loading && <Loader />}

          <div className="logo-container">
            {pageName !== "video" && (
              <div className="mobile-menu-toggle " onClick={mobileMenuToggle}>
                {mobileMenu ? (
                  <CgClose className="icon" />
                ) : (
                  <SlMenu className="icon" />
                )}
              </div>
            )}
            <Link to="/" className="logo">
              <img className="logo-desktop" src={ytLogo} alt="Youtube" />
              <img className="logo-mobile" src={ytLogoMobile} alt="Youtube" />
            </Link>
          </div>
          <div className="search-container">
            <div className="search-input-container ">
              <div className="search-icon-container ">
                <IoIosSearch className="icon1" />
              </div>
              <input
                type="text"
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                placeholder="Search"
                value={searchQuery}
              />
            </div>
            <button
              className="search-button "
              onClick={() => searchQueryHandler("searchButton")}
            >
              <IoIosSearch className="icon" />
            </button>
          </div>
          <div className="user-icons-container ">
            <div className=" user">
              <div className="user-icon ">
                <RiVideoAddLine className="iconUser" />
              </div>
              <div className="user-icon-2">
                <FiBell className="iconUser" />
              </div>
            </div>
            <div className="user-avatar-container ">
              {user ? (
                <>
                  {/* <div className="user-username">{user.username}</div> */}
                  <button className="login-button" onClick={logoutUser}>
                    Logout
                  </button>
                </>
              ) : (
                <button className="login-button" onClick={openLoginPage}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
