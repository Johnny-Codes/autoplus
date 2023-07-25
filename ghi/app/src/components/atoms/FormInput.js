import React from "react";

export default function FormInput({ type, ...rest }) {
  return <input className="form-control" type={type} {...rest} />;
}
