import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateFormPartOne } from "../../redux/reducers/form.reducer";
import axios from "axios";
import jsPDF from "jspdf";

const FormPartOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formPartOne = useSelector((state) => state.form.FormPartOne);

  const [formValues, setFormValues] = useState(formPartOne);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleNext = () => {
    dispatch(updateFormPartOne(formValues));
    history.push("/form-part-two");
  };

  const handleUploadToCloudinary = async () => {
    setUploading(true);

    // Generate PDF
    const doc = new jsPDF();
    doc.text("Applicant Information", 10, 10);
    Object.entries(formValues).forEach(([key, value], index) => {
      doc.text(`${key}: ${value}`, 10, 20 + index * 10);
    });
    const pdfBlob = doc.output("blob");

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", "your_upload_preset"); // Set your Cloudinary upload preset here.

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/your_cloud_name/raw/upload`, // Replace 'your_cloud_name' with your actual cloud name.
        formData
      );
      alert(`Uploaded Successfully: ${response.data.secure_url}`);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Applicant Information</h2>
      <form>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other form fields here */}
        <button type="button" onClick={handleNext}>
          Next
        </button>
        <button
          type="button"
          onClick={handleUploadToCloudinary}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload as PDF"}
        </button>
      </form>
    </div>
  );
};

export default FormPartOne;
