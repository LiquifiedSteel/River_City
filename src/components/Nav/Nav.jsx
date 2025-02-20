/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import axios from "axios";

const navBarStyle = css`
  background-color: #D3D3D3;
  color: #ffffff;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const navTitleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    opacity: 70%;
  }

  @media (max-width: 576px) {
    font-size: 1.4rem;
  }
`;

const linkStyle = css`
  text-decoration: none;
  color: #ffffff;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #1a4a29;
    color: #d1e8d3;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;

const togglerButtonStyle = css`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (min-width: 1024px) {
    display: none; 
  }
`;

const collapsedLinksContainer = css`
  display: none;
  flex-direction: column;
  background-color: #205831;
  padding: 10px;

  &.open {
    display: flex;
  }

  @media (min-width: 1024px) {
    display: flex !important;
    flex-direction: row; 
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    background-color: transparent; 
    padding: 0;
  }
`;

const listItemStyle = css`
  list-style: none;

  @media (min-width: 1024px) {
    margin: 0;
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const remaining = useSelector((store) => store.remaining)
  const user = useSelector((store) => store.user);
  const budget = useSelector((store) => store.budget);
  const location = useLocation(); // React Router's hook to access the current URL
  const envelope = new URLSearchParams(location.search).get("envelope"); // Extracts the "envelope" query parameter from the URL
  const dispatch = useDispatch();

  useEffect(() => {
    // Async function to fetch budget things
    dispatch({type: "GRAB_BUDGET"});
    dispatch({type: "CALCULATE_REMAINING"});
}, [])

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav css={navBarStyle}>
      <div className="d-flex align-items-center justify-content-between">
        {/* Brand/Title */}
        {user.isAdmin ? 
          <Link to="/admin-users" css={navTitleStyle}>
            <img src="rcc-logo.png" />
          </Link> 
          : 
          <Link to="/home" css={navTitleStyle}>
            <img src="rcc-logo.png" />
          </Link>
        }

        {/* Toggler Button for Mobile */}
        <button
          css={togglerButtonStyle}
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>

      {/* Collapsible Links */}
      <div
        css={[collapsedLinksContainer, isOpen && css`display: flex;`]}
        className={`navbar-collapse ${isOpen ? "show" : ""}`}
      >
        <ul
          css={css`
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;

            @media (min-width: 1024px) {
              flex-direction: row;
              align-items: center;
            }
          `}
        >
          {envelope && <h2>{envelope}</h2>}
          {user.id && budget[0] && <>
            <div>
              <h3>Total Budget for {new Date().getFullYear()}: ${budget[0].amount}</h3>
              <h3>Remaining Budget for {new Date().getFullYear()}: ${ (budget[0].amount - remaining).toFixed(2)}</h3>
            </div>
          </>}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
