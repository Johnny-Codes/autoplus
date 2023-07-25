import React from "react";

export default function FormLabel({ htmlFor, text, ...rest }) {
  return (
    <label htmlFor={htmlFor} {...rest}>
      {text}
    </label>
  );
}
