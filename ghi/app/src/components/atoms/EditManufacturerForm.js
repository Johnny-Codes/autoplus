import { useState } from "react";
import FormInput from "./FormInput";
import Button from "./Button";
export default function EditManufacturerForm({ id, onClose, name }) {
  const [names, setNames] = useState("");

  const handleChange = (e) => {
    setNames(e.target.value);
    console.log("name", name);
  };

  const handleSubmit = async () => {
    const data = {};
    data.name = name;
    const man_id = id.id;
    const json = JSON.stringify(data);
    const url = `http://localhost:8100/api/manufacturers/${man_id}/`;
    const fetchConfig = {
      method: "put",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder={name}
          name="name"
          onChange={handleChange}
        />
        <Button text="Submit" />
      </form>
      <Button text="Close" onClick={onClose} />
    </>
  );
}
