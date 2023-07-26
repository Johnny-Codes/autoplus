import React from "react";

export default async function HandleFormSubmit({ formData, url }) {
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
    if (!response.ok) {
      window.alert("something went wrong");
    }
  } catch (error) {
    window.alert({ error });
  }
}
