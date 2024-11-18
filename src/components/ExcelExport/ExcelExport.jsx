import React from "react";
import axios from "axios";

const ExportExcelButton = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("/api/excel/export", {
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

  return <button onClick={handleExport}>Export to Excel</button>;
};

export default ExportExcelButton;
