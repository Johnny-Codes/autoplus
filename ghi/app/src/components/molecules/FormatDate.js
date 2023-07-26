import React from "react";

export default function FormatDate(dateTime) {
  const date = new Date(dateTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
