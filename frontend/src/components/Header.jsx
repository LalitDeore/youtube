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
  const { loading, mobileMenu, setMobileMenu, setUser, isLogIn, setIsLogIn } =
    useContext(Context);
  const navigate = useNavigate();

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
  const logoutUser = () => {
    setIsLogIn(false);
  };

  return (
    <>
      <div className="header-container">
        {loading && <Loader />}

        <div className="flex h-5 items-center">
          {pageName !== "video" && (
            <div
              className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
              onClick={mobileMenuToggle}
            >
              {mobileMenu ? (
                <CgClose className="text-white text-xl" />
              ) : (
                <SlMenu className="text-white text-xl" />
              )}
            </div>
          )}
          <Link to="/" className="logo">
            <img className="logo-desktop" src={ytLogo} alt="Youtube" />
            <img className="logo-mobile" src={ytLogoMobile} alt="Youtube" />
          </Link>
        </div>
        <div
          className="search-container"
          style={{ marginRight: "5px", cursor: "pointer" }}
        >
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
              style={{ marginLeft: "20px" }}
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
            {isLogIn ? (
              <>
                <button className="login-button" onClick={logoutUser}>
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signUp"
                className="login-button"
                onClick={openLoginPage}
                style={{ marginLeft: "10px" }}
              >
                SignUp
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
