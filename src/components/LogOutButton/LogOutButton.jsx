/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

const buttonStyle = css`
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #c0392b; 
    transform: translateY(-2px); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(231, 76, 60, 0.4); 
  }
`;

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button
      css={buttonStyle}
      className={props.className} 
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;

