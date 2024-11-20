/** @jsxImportSource @emotion/react */
import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";

const navBarStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #205831; 
  padding: 10px 20px;
  color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const navTitleStyle = css`
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;

  &:hover {
    color: #d1e8d3; 
  }
`;

const navLinksContainer = css`
  display: flex;
  gap: 15px;
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
`;

const Nav = () => {
  const user = useSelector((store) => store.user);

  return (
    <div css={navBarStyle}>
      <Link to="/home" css={navTitleStyle}>
        Prime Solo Project
      </Link>
      <div css={navLinksContainer}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          <Link to="/login" css={linkStyle}>
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link to="/admin-dashboard" css={linkStyle}>
          Admin Dashboard
        </Link>
        <Link to="/form-part-one" css={linkStyle}>
          Form Part One
        </Link>
        <Link to="/form-part-two" css={linkStyle}>
          Form Part Two
        </Link>
        <Link to="/form-part-three" css={linkStyle}>
          Form Part Three
        </Link>
        <Link to="/form-review" css={linkStyle}>
          Form Review
        </Link>
        <Link to="/submission-success" css={linkStyle}>
          Form Success
        </Link>
      </div>
    </div>
  );
};

export default Nav;
