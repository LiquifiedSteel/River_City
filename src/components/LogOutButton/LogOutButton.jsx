/** @jsxImportSource @emotion/react */
import React from "react";
import { useDispatch } from "react-redux";
import { css } from "@emotion/react";

const buttonStyle = css`
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

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

