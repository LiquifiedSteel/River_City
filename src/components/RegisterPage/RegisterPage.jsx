/** @jsxImportSource @emotion/react */
import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";

const pageStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4; 
  padding: 20px;
`;

const buttonStyle = css`
  background-color: #205831; 
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #174a28; 
    transform: translateY(-2px); 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(32, 88, 49, 0.4); 
  }
`;

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toggle = useSelector(store => store.envSwitch);

  useEffect(() => {
    document.title = "Register";
    toggle && dispatch({type: 'SWITCH'});
  }, []);

  return (
    <div css={pageStyle}>
      <RegisterForm />
      <button
        type="button"
        css={buttonStyle}
        onClick={() => {
          history.push("/login");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default RegisterPage;
