import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

export default function ManufacturersList() {
  const manufacturers = useApi({
    url: "http://localhost:8100/api/manufacturers/",
  });
  const manufacturerList = manufacturers.manufacturers;

  return (
    <div>
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturerList &&
            manufacturerList.map((manufacturer) => {
              return (
                <tr key={manufacturer.href}>
                  <td>{manufacturer.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
