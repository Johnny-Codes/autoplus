import React from "react";
import useApi from "../../hooks/useApi";
import "./AutomobilesList.css";

export default function AutomobileList() {
  const data = useApi({ url: "http://localhost:8100/api/automobiles/" });
  console.log("automobile data", data);
  const automobiles = data.autos;
  console.log(automobiles);

  return (
    <div className="automobile-list">
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles &&
            automobiles.map((automobile) => {
              return (
                <tr key={automobile.href}>
                  <td>{automobile.vin}</td>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.model.name}</td>
                  <td>{automobile.model.manufacturer.name}</td>
                  <td>{automobile.sold === false ? "No" : "Yes"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
