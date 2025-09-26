/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";

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
    margin: 30px;
  }
`;

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const remaining = useSelector((store) => store.remaining);
  const user = useSelector((store) => store.user);
  const budget = useSelector((store) => store.budget);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const search = location?.search || "";
  const envelope = new URLSearchParams(search).get("envelope");

  useEffect(() => {
    dispatch({ type: "GRAB_BUDGET" });
    dispatch({ type: "CALCULATE_REMAINING" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNavbar = () => setIsOpen((prev) => !prev);

  return (
    <nav css={navBarStyle}>
      <div className="d-flex align-items-center justify-content-between">
        <img src="rcc-logo.png" alt="River City Church" />
        {envelope && <p className="hide">{envelope}</p>}
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
          {user.isAdmin && (
            <li css={listItemStyle}>
              {location?.pathname !== "/home" ? (
                <button className="adminButton" onClick={() => navigate("/home")}>
                  Home
                </button>
              ) : (
                <button className="adminButton" onClick={() => navigate("/admin-users")}>
                  Admin
                </button>
              )}
            </li>
          )}

          {user.id && (
            <li css={listItemStyle}>
              <LogOutButton className="adminButton" />
            </li>
          )}

          {user.id && budget[0] && (
            <>
              <li css={listItemStyle}>
                <h3>
                  Total Budget for {new Date().getFullYear()}: ${budget[0].amount}
                </h3>
                <h3>
                  Remaining Budget for {new Date().getFullYear()}: $
                  {(budget[0].amount - (Number(remaining) || 0)).toFixed(2)}
                </h3>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;