/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";

const formStyle = css`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const headingStyle = css`
  text-align: center;
  font-size: 1.5rem;
  color: #205831;
  margin-bottom: 20px;
`;

const inputContainer = css`
  margin-bottom: 15px;
`;

const labelStyle = css`
  display: block;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccd1d9;
  border-radius: 4px;
  font-size: 1rem;
  color: #2c3e50;

  &:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.4);
  }
`;

const buttonStyle = css`
  width: 100%;
  background-color: #205831;
  color: white;
  margin-bottom: 8px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #174a28;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(32, 88, 49, 0.4);
  }
`;

const errorStyle = css`
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 15px;
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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

  const handleGuest = () => {
      dispatch({
        type: "LOGIN",
        payload: { username:"guest", password:"pass" },
      });
  }

  return (
    <form css={formStyle} onSubmit={login}>
      <h2 css={headingStyle}>Login</h2>
      {errors.loginMessage && <div css={errorStyle}>{errors.loginMessage}</div>}
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          css={inputStyle}
        />
      </div>
      <div css={inputContainer}>
        <label css={labelStyle} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          css={inputStyle}
        />
      </div>

      <button type="button" css={buttonStyle} onClick={handleGuest}>Sign-In as Guest</button>

      <button type="submit" css={buttonStyle}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
