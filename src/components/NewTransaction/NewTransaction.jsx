/** @jsxImportSource @emotion/react */
/**
 * NewTransaction.jsx
 *
 * Purpose:
 *  - Collect user input for a new transaction and submit it to the backend.
 *  - Provide a simple file picker (Cloudinary widget) to attach a receipt.
 *  - Navigate back to the envelope detail view after a successful submit.
 *
 * Key Details:
 *  - Reads the `envelope` name from the URL query string.
 *  - Loads the Cloudinary widget script via the `useScript` hook.
 *  - Sends a POST request to `/api/transactions` with the form data.
 *  - Uses a 3×3 CSS grid (see NewTransaction.css) for layout.
 *
 * Notes:
 *  - The API expects the receipt URL in `recieptLink` (spelling preserved to match the backend).
 */

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useScript } from "../../hooks/useScript";
import "./NewTransaction.css";

const NewTransaction = () => {
  // Load Cloudinary widget script at component mount
  useScript("https://widget.cloudinary.com/v2.0/global/all.js");

  // Routing and query parameters
  const location = useLocation();
  const history = useHistory();
  const envelope = new URLSearchParams(location.search).get("envelope");

  // Form state
  const [reciept, setReciept] = useState("");
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [transactionLocation, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [outOfPocket, setOutOfPocket] = useState(false);

  // Page setup
  useEffect(() => {
    document.title = "Rental Request Form";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Open Cloudinary widget to pick a file and capture the URL
  const openWidget = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary widget script not found.");
      return;
    }
    window.cloudinary
      .createUploadWidget(
        {
          sources: ["local"],
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setReciept(result.info.secure_url);
          }
        }
      )
      .open();
  };

  // Checkbox toggle
  const handleOutOfPocketChange = (e) => {
    setOutOfPocket(e.target.checked);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/transactions", {
        envelope,
        name,
        recieptLink: reciept,
        location: transactionLocation,
        timeDate: date,
        amount,
        outOfPocket,
        tag,
      });
      history.push(`/envelope?envelope=${envelope}`);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  // Render
  return (
    <div className="shadow">
      <h2 className="text-center mb-4">Transaction Details</h2>

      <form onSubmit={handleSubmit} className="grid">
        <div className="text-center grid-col_4">
          <label htmlFor="tag">Add a tag to this transaction</label>
          <input
            id="tag"
            placeholder="Tag of Transaction"
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="name">What is your name?</label>
          <input
            id="name"
            placeholder="Name of User"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="location">Where did you make the transaction?</label>
          <input
            id="location"
            placeholder="Address/Name of Location"
            type="text"
            value={transactionLocation}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="date">Date of Transaction</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="amount">Amount Spent</label>
          <input
            id="amount"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="text-center grid-col_4">
          <input
            id="OOP"
            type="checkbox"
            checked={outOfPocket}
            onChange={handleOutOfPocketChange}
          />
          <label htmlFor="OOP">Did you pay for this out of your own pocket?</label>
        </div>

        <div className="text-center grid-col-12">
          <p className="userTextColor">
            File to upload:{" "}
            <button type="button" onClick={openWidget}>
              Pick File
            </button>
          </p>
          {reciept && (
            <p className="userTextColor" style={{ wordBreak: "break-all" }}>
              Selected file: {reciept}
            </p>
          )}
        </div>

        <button type="button" onClick={() => history.push(`/envelope?envelope=${envelope}`)}>
          Back
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewTransaction;
