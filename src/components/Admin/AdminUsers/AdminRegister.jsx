/** @jsxImportSource @emotion/react */
/**
 * RegisterForm.jsx
 *
 * Purpose:
 *   Renders the registration/create-user form. If `envSwitch` is true, we assume
 *   an admin is creating a user (dispatches ADD_USER). Otherwise, it registers
 *   a self-serve account (dispatches REGISTER).
 *
 * Notes:
 *   - Fixes the original logic bug where `SWITCH` was dispatched before reading
 *     the current toggle value (resulting in stale reads).
 *   - Adds consistent card styling, focus states, and button treatment aligned
 *     with the rest of the app.
 *   - Includes basic disabled state to avoid double-submits.
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";

/* -----------------------------
   Card container
------------------------------ */
const formStyle = css`
  max-width: 520px;
  margin: 0 auto;
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
`;

/* -----------------------------
   Heading
------------------------------ */
const headingStyle = css`
  text-align: center;
  font-size: 1.6rem;
  color: #36454f;
  margin: 0 0 1rem 0;
`;

/* -----------------------------
   Field group
------------------------------ */
const inputContainer = css`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
`;

const labelStyle = css`
  font-weight: 600;
  color: #34495e;
`;

const inputStyle = css`
  width: 100%;
  box-sizing: border-box;
  padding: 0.65rem 0.8rem;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  font-size: 1rem;
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
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  text-align: center;
  margin: 0 0 0.9rem 0;
`;

/* -----------------------------
   Primary button
------------------------------ */
const buttonStyle = css`
  width: 100%;
  padding: 0.8rem 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease,
    transform 0.02s ease-in-out, filter 0.15s ease;
  background: #2f6fed;
  border: 1px solid #2f6fed;
  color: #fff;

  &:hover {
    filter: brightness(0.98);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(91, 141, 239, 0.25);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function AdminRegister() {
  // Local input state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Global state
  const toggle = useSelector((store) => store.envSwitch);
  const errors = useSelector((store) => store.errors);

  const dispatch = useDispatch();

  /**
   * Handle submit:
   * - Read the current toggle value BEFORE dispatching any switch action.
   * - Dispatch ADD_USER (admin flow) or REGISTER (self-register).
   * - Optionally reset the toggle afterward if you want to always close the form.
   */
  const registerUser = (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    // Snapshot the current toggle state BEFORE any changes
    const isAdminCreateFlow = toggle.login === true;

    if (isAdminCreateFlow) {
      dispatch({ type: "ADD_USER", payload: { username, password, email } });
      // If you want to close the form immediately after submit:
      dispatch({ type: "RESET" }); // flips true -> false
    } else {
      dispatch({
        type: "ADMIN_NEW_USER",
        payload: { username, password, email },
      });
    }

    // Re-enable submit quickly; if you prefer, move this to a saga success callback
    setSubmitting(false);
  };

  return (
    <form css={formStyle} onSubmit={registerUser} noValidate>
      <h2 css={headingStyle}>Register</h2>

      {/* Auth/registration error feedback */}
      {errors.registrationMessage && (
        <div css={errorStyle} role="alert" aria-live="polite">
          {errors.registrationMessage}
        </div>
      )}

      {/* Username */}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="reg-username">
          Username
        </label>
        <input
          id="reg-username"
          type="text"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          css={inputStyle}
          autoComplete="username"
        />
      </div>

      {/* Password */}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="reg-password">
          Password
        </label>
        <input
          id="reg-password"
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          css={inputStyle}
          autoComplete="new-password"
        />
      </div>

      {/* Email */}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="reg-email">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          css={inputStyle}
          autoComplete="email"
        />
      </div>

      <button type="submit" css={buttonStyle} disabled={submitting}>
        {submitting ? "Submitting..." : "Register"}
      </button>
    </form>
  );
}

export default AdminRegister;