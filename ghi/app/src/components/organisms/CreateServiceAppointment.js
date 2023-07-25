import React, { useState } from "react";
import CreateButton from "../molecules/CreateButton";
import FormInput from "../atoms/FormInput";
import useApi from "../../hooks/useApi";
import FormOption from "../atoms/FormOption";

export default function CreateServiceAppointment() {
  const [formData, setFormData] = useState({});

  const techData = useApi({ url: "http://localhost:8070/api/technicians/" });
  const technicians = techData.technicians;

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = JSON.stringify(formData);
    console.log("json", json);
    const url = "http://localhost:8070/api/appointments/";
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
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="create-service-appointment-form">
      <h1>Create a Service Appointment</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="text"
          name="vin"
          id="vin"
          onChange={handleFormChanges}
          placeholder="VIN"
          value={formData.vin || ""}
        />
        <FormInput
          required
          type="text"
          name="customer"
          id="customer"
          onChange={handleFormChanges}
          placeholder="Customer Name"
          value={formData.customer || ""}
        />
        <FormInput
          required
          type="text"
          name="reason"
          id="reason"
          onChange={handleFormChanges}
          placeholder="Reason"
          value={formData.reason || ""}
        />
        <FormInput
          required
          type="datetime-local"
          onChange={handleFormChanges}
          name="date_time"
          id="date_time"
          placeholder="Date"
          value={formData.date_time || ""}
        />
        <select
          required
          className="form-select"
          onChange={handleFormChanges}
          name="technician"
        >
          <option value="">Select Technician</option>
          {technicians &&
            technicians.map((technician) => {
              return (
                <FormOption
                  text={`${technician.first_name} ${technician.last_name}`}
                  value={technician.id}
                  key={technician.id}
                />
              );
            })}
        </select>
        <CreateButton />
      </form>
    </div>
  );
}
