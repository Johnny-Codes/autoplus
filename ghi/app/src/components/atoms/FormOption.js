import React from "react";

export default function FormOption({ text, ...rest }) {
  return <option {...rest}>{text}</option>;
}
