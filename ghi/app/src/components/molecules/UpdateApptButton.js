import React from "react";
import Button from "../atoms/Button";

export default function UpdateApptButton(props) {
  const handleCancel = async () => {
    const data = {};
    data.id = props.id;
    data.status = props.status;
    const json = JSON.stringify(data);
    let url;
    if (props.status === "Canceled") {
      url = `http://localhost:8070/api/appointments/${props.id}/cancel/`;
    } else {
      url = `http://localhost:8070/api/appointments/${props.id}/finish/`;
    }
    const fetchConfig = {
      method: "put",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={handleCancel}
      className={props.className}
      text={props.text}
    />
  );
}
