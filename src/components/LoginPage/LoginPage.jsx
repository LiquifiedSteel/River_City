/** @jsxImportSource @emotion/react */
/**
 * LoginPage.jsx
 *
 * Purpose:
 *   Renders the LoginForm and a secondary action to navigate to registration.
 *
 * Styling:
 *   - Neutral page background to contrast the login card.
 *   - Secondary button uses the app’s standard neutral style (no green).
 */

import React, { useEffect } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/react";

/* -----------------------------
   Page container
------------------------------ */
const pageStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;                 /* space between form and button */
  align-items: center;
  justify-content: center;
  background: #f7f9fc;       /* neutral background */
  padding: 1.25rem;
`;

/* -----------------------------
   Secondary action button (neutral)
   Matches app style: rounded, subtle shadow/focus ring, no green.
------------------------------ */
const btnBase = css`
  width: 100%;
  max-width: clamp(520px, 60vw, 720px);        /* aligns with LoginForm width */
  padding: 0.7rem 0.9rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease,
    transform 0.02s ease-in-out, filter 0.15s ease;

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.25);
  }
`;

const buttonStyle = css`
  ${btnBase};
  background: #f6f6f6;       /* neutral secondary */
  border: 1px solid #cfcfcf;
  color: #1f2937;

  &:hover {
    filter: brightness(0.98);
  }
`;

/**
 * LoginPage
 *
 * Renders the login form and a secondary “Register” action.
 */
const LoginPage = () => {
  const history = useHistory();

  // Set document title on mount
  useEffect(() => {
    document.title = "Log-In";
  }, []);

  // Navigate to the registration route
  const goToRegistration = () => {
    history.push("/registration");
  };

  return (
    <div css={pageStyle}>
      <LoginForm />
      <button type="button" css={buttonStyle} onClick={goToRegistration}>
        Register
      </button>
    </div>
  );
};

export default LoginPage;