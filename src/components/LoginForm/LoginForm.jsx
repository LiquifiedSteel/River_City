/** @jsxImportSource @emotion/react */
/**
 * LoginForm.jsx
 *
 * Purpose:
 *   Renders a login form that authenticates a user via Redux actions.
 *
 * Responsibilities:
 *   - Collect username and password.
 *   - Dispatch LOGIN or input-error actions.
 *
 * UX/Accessibility:
 *   - Labels are explicitly bound to inputs via htmlFor/id.
 *   - Clear focus rings and error messaging.
 *
 * Styling:
 *   - Card-style layout with responsive width (clamped),
 *     comfortable control sizes, and a full-width primary action.
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";

/* -----------------------------
   Card container (bigger, responsive)
------------------------------ */
const formStyle = css`
  /* Scales with viewport but won’t exceed 720px */
  max-width: clamp(520px, 60vw, 720px);
  width: 100%;
  margin: 0 auto;

  /* More breathing room */
  padding: clamp(1.25rem, 2vw, 2rem);

  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
`;

/* -----------------------------
   Heading (slightly larger, responsive)
------------------------------ */
const headingStyle = css`
  text-align: center;
  font-size: clamp(1.5rem, 1.1vw + 1.2rem, 1.75rem);
  color: #36454f;
  margin: 0 0 1.1rem 0;
`;

/* -----------------------------
   Field group
------------------------------ */
const inputContainer = css`
  display: grid;
  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const labelStyle = css`
  font-weight: 600;
  color: #34495e;
  font-size: 0.98rem;
`;

/* Inputs: wider padding and slightly larger type */
const inputStyle = css`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  font-size: 1.05rem;
  color: #2c3e50;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #5b8def;
    box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.2);
  }
`;

/* -----------------------------
   Error alert
------------------------------ */
const errorStyle = css`
  background: #fdecea;
  color: #b71c1c;
  border: 1px solid #f5c6c4;
  padding: 0.7rem 0.9rem;
  border-radius: 8px;
  text-align: center;
  margin: 0 0 1rem 0;
  font-size: 0.98rem;
`;

/* -----------------------------
   Button row (full width)
------------------------------ */
const buttonRow = css`
  display: grid;
  grid-template-columns: 1fr;  /* single action = full width */
  gap: 0.85rem;
  margin-top: 0.5rem;
`;

/* Base button + primary style */
const btnBase = css`
  width: 100%;
  padding: 0.9rem 1rem;       /* larger tap target */
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

const btnPrimary = css`
  ${btnBase};
  background: #2f6fed;
  border: 1px solid #2f6fed;
  color: #fff;

  &:hover {
    filter: brightness(0.98);
  }
`;

/**
 * LoginForm
 *
 * Reads error state from Redux and dispatches login-related actions.
 * State is kept local for form fields; no passwords are logged.
 */
const LoginForm = () => {
  // Local input state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Global error state (e.g., auth failures)
  const errors = useSelector((store) => store.errors);

  // Dispatch for auth actions
  const dispatch = useDispatch();

  /**
   * Handle standard login submission.
   * Validates inputs and dispatches LOGIN, otherwise raises input error.
   */
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: { username, password },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  // Render the login form
  return (
    <form css={formStyle} onSubmit={login}>
      <h2 css={headingStyle}>Login</h2>

      {/* Auth error feedback */}
      {errors.loginMessage && <div css={errorStyle}>{errors.loginMessage}</div>}

      {/* Username field */}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          css={inputStyle}
          autoComplete="username"
        />
      </div>

      {/* Password field */}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          css={inputStyle}
          autoComplete="current-password"
        />
      </div>

      {/* Action: login */}
      <div css={buttonRow}>
        <button type="submit" css={btnPrimary}>
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;