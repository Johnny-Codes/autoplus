import React from "react";

export default async function useHandleSubmit(props) {
  //   props.e.preventDefault();
  const json = JSON.stringify(props.formData);
  const fetchConfig = {
    method: "post",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(props.url, fetchConfig);
  if (response.ok) {
    console.log("my custom hook submit worked");
  }
}
