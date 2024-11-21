/** @jsxImportSource @emotion/react */
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f9f9f9;
  padding: 20px;
  text-align: center;
`;

const cardStyle = css`
  max-width: 600px;
  background: #205831;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const headingStyle = css`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;

const textStyle = css`
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 30px;
`;

const buttonStyle = css`
  background-color: #3498db;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const SuccessPage = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/home"); // Replace "/home" with the desired route
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle}>
        <h1 css={headingStyle}>Submission Successful!</h1>
        <p css={textStyle}>
          Thank you for submitting the form. Your application has been received
          and is being processed. We'll get back to you shortly!
        </p>
        <button css={buttonStyle} onClick={handleRedirect}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
