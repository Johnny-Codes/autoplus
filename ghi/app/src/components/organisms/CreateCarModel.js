import React, { useState } from "react";
import CreateButton from "../molecules/CreateButton";
import FormInput from "../atoms/FormInput";
import useApi from "../../hooks/useApi";
import FormOption from "../atoms/FormOption";

export default function CreateCarModel() {
  const [formData, setFormData] = useState({});
  const mData = useApi({ url: "http://localhost:8100/api/manufacturers/" });
  const manufacturers = mData.manufacturers;

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8100/api/models/";
    const json = JSON.stringify(formData);
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

  const getCarModelUrl = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8100/api/models/get-picture/";
    const data = {};
    data.name = formData.name;
    data.manufacturer_id = formData.manufacturer_id;
    const json = JSON.stringify(data);
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
        const json = await response.json();
        setFormData({ ...formData, picture_url: json });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="form">
      <h1>Add Car Model</h1>
      <form id="add-car-model-form" className="form" onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          name="name"
          id="name"
          value={formData.name || ""}
          onChange={handleFormChanges}
          placeholder="Model Name"
        />
        <select
          required
          className="form-select"
          name="manufacturer_id"
          onChange={handleFormChanges}
        >
          <option value="">Select a Manufacturer</option>
          {manufacturers &&
            manufacturers.map((manufacturer) => {
              return (
                <FormOption
                  text={manufacturer.name}
                  name="manufacturer_id"
                  key={manufacturer.id}
                  value={manufacturer.id}
                />
              );
            })}
        </select>

        <FormInput
          required
          type="text"
          name="picture_url"
          value={formData.picture_url || ""}
          id="picture_url"
          onChange={handleFormChanges}
          placeholder="URL for photo"
        />
        <CreateButton />
      </form>
      <button onClick={getCarModelUrl}>Get a Picture</button>
      <p>
        To use the "Get a Picture" button please create a .env with a PEXEL API
        key labeled "PEXELS_API_KEY"
      </p>
    </div>
  );
}
