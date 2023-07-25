import React from "react";
import useApi from "../../hooks/useApi";

export default function TechnicianList() {
  const techData = useApi({ url: "http://localhost:8070/api/technicians/" });
  const technicians = techData.technicians;

  return (
    <div className="list-technicians">
      <h1>Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {technicians &&
            technicians.map((technician) => {
              return (
                <tr key={technician.employee_id}>
                  <td>
                    {technician.first_name} {technician.last_name}
                  </td>
                  <td>{technician.employee_id}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
