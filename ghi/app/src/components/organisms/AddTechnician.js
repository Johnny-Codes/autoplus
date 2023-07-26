import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import CreateButton from "../molecules/CreateButton";

export default function AddTechnician() {
  const [formData, setFormData] = useState({});

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = JSON.stringify(formData);
    const url = "http://localhost:8070/api/technicians/";
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
        setFormData({});
      }
    } catch (error) {}
  };

  return (
    <div className="add-tech-form">
      <h1>Add a Technician</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="first_name"
          id="first_name"
          onChange={handleFormChanges}
          placeholder="First Name"
          value={formData.first_name || ""}
        />
        <FormInput
          type="text"
          name="last_name"
          id="last_name"
          onChange={handleFormChanges}
          placeholder="Last Name"
          value={formData.last_name || ""}
        />
        <FormInput
          type="text"
          name="employee_id"
          id="employee_id"
          onChange={handleFormChanges}
          placeholder="Employee ID"
          value={formData.employee_id || ""}
        />
        <CreateButton />
      </form>
    </div>
  );
}
