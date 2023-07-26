import React, { useState } from "react";
import FormInput from "../atoms/FormInput";
import CreateButton from "../molecules/CreateButton";
import HandleFormSubmit from "../../hooks/HandleFormSubmit";

export default function AddCustomer() {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HandleFormSubmit({
      formData: formData,
      url: "http://localhost:8090/api/customers/",
    });
    setFormData({});
  };

  return (
    <div className="add-customer-form">
      <h1>Add a Customer</h1>
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
          name="address"
          id="address"
          onChange={handleFormChange}
          value={formData.address || ""}
          placeholder="Full Address"
        />
        <FormInput
          required
          type="text"
          name="phone_number"
          id="phone_number"
          onChange={handleFormChange}
          value={formData.phone_number || ""}
          placeholder="Phone Number (281) 777-5555)"
        />
        <CreateButton />
      </form>
    </div>
  );
}
