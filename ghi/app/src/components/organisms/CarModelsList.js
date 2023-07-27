import React from "react";
import useApi from "../../hooks/useApi";
import "./CarModelsList.css";
import Button from "../atoms/Button";
import { useState, useEffect } from "react";

export default function CarModelsList() {
  const data = useApi({ url: "http://localhost:8100/api/models/" });
  const models = data.models;

  const handleDelete = async (e) => {
    const url = `http://localhost:8100/api/models/${e.target.value}/`;
    const fetchConfig = {
      method: "delete",
    };
    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="car-models">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {models &&
            models.map((model) => {
              return (
                <tr key={model.picture_url}>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img src={model.picture_url} alt={model.name} />
                  </td>
                  <td>
                    <Button
                      text="delete"
                      value={model.id}
                      onClick={handleDelete}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
