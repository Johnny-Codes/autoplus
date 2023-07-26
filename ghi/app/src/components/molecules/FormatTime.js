import React from "react";

export default function FormatTime(dateTime) {
  const time = new Date(dateTime);
  const hour = time.getHours();
  const minute = time.getMinutes();
  return `${hour}:${minute}`;
}
