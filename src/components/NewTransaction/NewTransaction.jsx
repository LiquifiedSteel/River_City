/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom"; // useLocation for getting URL query parameters
import axios from "axios";
import { useScript } from "../../hooks/useScript";

// ===============================================
// ====== FORM PART TWO COMPONENT LOGIC ======
// ===============================================
const NewTransaction = () => {
  // ====== HOOKS ======
  const location = useLocation();
  const envelope = new URLSearchParams(location.search).get("envelope"); // Extracts the "envelope" query parameter from the URL
  const history = useHistory(); // React Router history for navigation
  const [reciept, setReciept] = useState(""); // Stores the uploaded team PDF URL
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const [transactionLocation, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [outOfPocket, setOutOfPocket] = useState(false);

  // ====== MOUNTING EFFECT ======
  useEffect(() => {
    document.title = "Rental Request Form"; // Updates the document title when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  // Opens the Cloudinary widget for file upload
  const openWidget = (setter) => {
    if (window.cloudinary) {
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local"], // Restricts sources to local uploads
            cloudName: import.meta.env.VITE_CLOUDINARY_NAME, // Cloudinary account name
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET, // Upload preset for configuration
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setReciept(result.info.secure_url); // Save uploaded file URL
              console.log(result); // Log the result for debugging
            }
          }
        )
        .open(); // Open the widget
    } else {
      console.error("Cloudinary widget is not loaded."); // Error handling for missing Cloudinary library
    }
  };

  // Handles input changes for text, select, and checkbox fields
  const handleChange = (e) => {
    const { checked } = e.target;
    // Updates form values dynamically
    setOutOfPocket(checked);
  };

  const handleSubmit = () => {
    if (!reciept) {
      alert("You must upload the reciept with the transaction.");
    } else {
      const createTransaction = async () => {
        try {
          // Fetch applications data
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
      createTransaction(); // Invoke the fetch function
    }
  }

  // ====== COMPONENT RETURN ======
  return (
    <div className="shadow">
      <h2 className="text-center mb-4">Transaction Details</h2>
      <form onSubmit={() => handleSubmit()} className="grid">
        <div className="text-center grid-col_4">
          <label htmlFor="tag">Add a tag to this transaction</label>
          <br></br>
          <input id="tag" placeholder="Tag of Transaction" type="text" value={tag} onChange={() => setTag(event.target.value)} />
          <br></br>
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="name">What is your name?</label>
          <br></br>
          <input id="name" placeholder="Name of User" type="text" value={name} onChange={() => setName(event.target.value)} required />
          <br></br>
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="location">Where did you make the transaction?</label>
          <br></br>
          <input id="location" placeholder="Address/Name of Location" type="text" value={transactionLocation} onChange={() => setLocation(event.target.value)} required />
          <br></br>
        </div>
        
        <div className="text-center grid-col_4">
          <label htmlFor="date">Date of Transaction</label>
          <br></br>
          <input id="date" placeholder="Address/Name of Location" type="date" value={date} onChange={() => setDate(event.target.value)} required />
          <br></br>
        </div>

        <div className="text-center grid-col_4">
          <label htmlFor="amount">Amount Spent</label>
          <br></br>
          <input id="amount" placeholder="Amount" type="number" value={amount} onChange={() => setAmount(event.target.value)} required />
          <br></br>
        </div>

        <div className="text-center grid-col_4">
          <input id="OOP" type="checkbox" checked={outOfPocket} onChange={handleChange} />
          <label htmlFor="OOP">Did you pay for this out of your own pocket?</label>
        </div>

        <div className="text-center grid-col-12">
          {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
          <p className="userTextColor">
            File to upload:{" "}
            <button type="button" onClick={openWidget}>
              Pick File
            </button>
          </p>
        </div>
        
        
        <button type="button" onClick={() => history.push(`/envelope?envelope=${envelope}`)}>Back</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewTransaction;
