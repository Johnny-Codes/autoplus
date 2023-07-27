import { useState, useEffect } from "react";

export default function GalacticVehicles() {
  const [vehicles, setVehicles] = useState([]);

  const getVehicleData = async () => {
    let nextUrl = "https://swapi.dev/api/vehicles/";
    while (nextUrl) {
      try {
        const response = await fetch(nextUrl);
        if (response.ok) {
          const json = await response.json();
          console.log(json.next);
          nextUrl = json.next;
          setVehicles((prev) => [...prev, ...json.results]);
          console.log("vehicles", vehicles);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getVehicleData();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          {vehicles &&
            vehicles.map((vehicle) => {
              return (
                <tr key={vehicle.created}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.manufacturer}</td>
                  <td>{vehicle.cost_in_credits}</td>
                  <td>{vehicle.crew}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
