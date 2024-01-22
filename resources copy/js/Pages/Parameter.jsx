import React, { useState } from "react";

export default function Parameter(props) {
  // State variables to store form data
  const [formData, setFormData] = useState({
    nama: "",
    code: "",
    status: "",
  });

  // Handler function to update form data when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Submit handler - you can customize this based on your requirements
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data, such as sending it to the server
    console.log("Form Data Submitted:", formData);
    // Add your logic here to handle the form data (e.g., send it to the server)
  };

  return (
    <div className="mt-5 d-flex flex-column align-items-center">
      <h1>Welcome Parameter to Inertia React Admin Panel</h1> 
    </div>
  );
}
