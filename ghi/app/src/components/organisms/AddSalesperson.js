import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import CreateButton from "../molecules/CreateButton";

export default function AddSalesperson() {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = JSON.stringify(formData);
    const url = "http://localhost:8090/api/salespeople/";
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        console.log("created");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="add-salesperson-form">
      <h1>Add Salesperson</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleFormChange}
          value={formData.first_name || ""}
          placeholder="First Name"
        />
        <FormInput
          required
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleFormChange}
          value={formData.last_name || ""}
          placeholder="Last Name"
        />
        <FormInput
          required
          type="text"
          name="employee_id"
          id="employee_id"
          onChange={handleFormChange}
          value={formData.employee_id || ""}
          placeholder="Employee ID"
        />
        <CreateButton />
      </form>
    </div>
  );
}
