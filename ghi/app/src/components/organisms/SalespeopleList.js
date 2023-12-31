import React from "react";
import useApi from "../../hooks/useApi";
import HandleDelete from "../molecules/HandleDelete";

export default function SalespeopleList() {
  const sData = useApi({ url: "http://localhost:8090/api/salespeople/" });
  const salespeople = sData.salespeople;

  return (
    <div className="salespeople-list">
      <h1>Salespeople</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {salespeople &&
            salespeople.map((sales) => {
              return (
                <tr key={sales.employee_id}>
                  <td>{`${sales.first_name} ${sales.last_name}`}</td>
                  <td>{sales.employee_id}</td>
                  <td>
                    <HandleDelete
                      url={`http://localhost:8090/api/salespeople/${sales.id}/`}
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
