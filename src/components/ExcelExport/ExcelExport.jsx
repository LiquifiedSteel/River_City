/** @jsxImportSource @emotion/react */
import React from "react";
import axios from "axios";
import { css } from "@emotion/react";

const buttonStyle = css`
  background-color: #3498db; 
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9; 
    transform: translateY(-2px); 
  }

  &:active {
    background-color: #1f618d;
    transform: translateY(0);
  }
`;

const ExportExcelButton = () => {
  const handleExport = async () => {
    try {
      const response = await axios.post("/api/excel/export", null, {
        responseType: "blob",
      });

      // ====== Create a Blob URL and download the file ======
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Requests_Data.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting Excel file:", error);
    }
  };

  return (
    <button css={buttonStyle} onClick={handleExport}>
      Export to Excel
    </button>
  );
};

export default ExportExcelButton;
