/** @jsxImportSource @emotion/react */
/**
 * LoginPage.jsx
 *
 * Purpose:
 *   Top-level page that renders the LoginForm and provides a
 *   secondary action to navigate to the registration flow.
 *
 * Responsibilities:
 *   - Set the document title on mount.
 *   - Center the content vertically and horizontally.
 *   - Offer a clearly styled "Register" button that does not
 *     compete with the primary "Log in" action inside LoginForm.
 *
 * UX/Accessibility:
 *   - Consistent focus rings for keyboard users.
 *   - Layout spacing that aligns with the app’s card aesthetics.
 *
 * Styling:
 *   - Uses Emotion CSS-in-JS to keep styles colocated.
 *   - Neutral page background (#f7f9fc) to contrast the login card.
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
  background: #f7f9fc;       /* neutral page background */
  padding: 1.25rem;
`;

/* -----------------------------
   Secondary action button
   (kept secondary so it doesn’t compete with “Log in”)
------------------------------ */
const btnBase = css`
  width: 100%;
  max-width: 420px;          /* aligns visually with LoginForm width */
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
  background: #f6f6f6;
  border: 1px solid #cfcfcf;
  color: #1f2937;
  margin-top: 0.25rem;

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

  // Set document title on mount for clarity and SEO
  useEffect(() => {
    document.title = "Log-In";
  }, []);

  // Navigate to the registration route
  const goToRegistration = () => {
    history.push("/registration");
  };

  return (
    <div css={pageStyle}>
      {/* Primary authentication form (contains its own primary/secondary actions) */}
      <LoginForm />

      {/* Secondary action for users who need an account */}
      <button type="button" css={buttonStyle} onClick={goToRegistration}>
        Register
      </button>
    </div>
  );
};

export default LoginPage;