import React, { useState, useEffect } from "react";
import FormInput from "../atoms/FormInput";
import CreateButton from "../molecules/CreateButton";

export default function CreateManufacturer() {
  const [formData, setFormData] = useState({});

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8100/api/manufacturers/";
    const json = JSON.stringify(formData);
    const fetchConfig = {
      method: "post",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData([]);
    }
  };

  return (
    <div className="form">
      <h1>Create New Manufacturer Listing</h1>
      <form id="create-manufacturer-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleFormChanges}
        />
        <CreateButton />
      </form>
    </div>
  );
}
