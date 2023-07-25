import React from "react";

export default function Button({ text, ...rest }) {
  return <button {...rest}>{text}</button>;
}
