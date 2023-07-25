import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import FormInput from "../atoms/FormInput";
import FormOption from "../atoms/FormOption";
import CreateButton from "../molecules/CreateButton";

export default function CreateAutomobile() {
  const [formData, setFormData] = useState({});
  const modelData = useApi({ url: "http://localhost:8100/api/models/" });
  const models = modelData.models;

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = JSON.stringify(formData);
    const url = "http://localhost:8100/api/automobiles/";
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
      } else {
        console.log("error making auto");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="add-auto-form">
      <h1>Add an Automobile to Inventory</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          onChange={handleFormChanges}
          value={formData.color || ""}
        />
        <FormInput
          type="number"
          name="year"
          id="year"
          placeholder="Year"
          onChange={handleFormChanges}
          value={formData.year || 2000}
        />
        <FormInput
          type="text"
          name="vin"
          id="vin"
          placeholder="VIN"
          onChange={handleFormChanges}
          value={formData.vin || ""}
        />
        <select
          className="form-select"
          onChange={handleFormChanges}
          name="model_id"
        >
          <option value="">Choose a Vehicle Model</option>
          {models &&
            models.map((model) => {
              return <FormOption text={model.name} value={model.id} />;
            })}
        </select>
        <CreateButton />
      </form>
    </div>
  );
}
