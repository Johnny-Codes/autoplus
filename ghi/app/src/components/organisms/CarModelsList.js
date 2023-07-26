import React from "react";
import useApi from "../../hooks/useApi";
import "./CarModelsList.css";

export default function CarModelsList() {
  const data = useApi({ url: "http://localhost:8100/api/models/" });
  const models = data.models;
  console.log("models", models);

  return (
    <div className="car-models">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models &&
            models.map((model) => {
              return (
                <tr>
                  <td>{model.name}</td>
                  <td>{model.manufacturer.name}</td>
                  <td>
                    <img src={model.picture_url} alt={model.name} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
