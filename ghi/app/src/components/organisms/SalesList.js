import React from "react";
import useApi from "../../hooks/useApi";
import HandleDelete from "../molecules/HandleDelete";

export default function SalesList() {
  const salesData = useApi({ url: "http://localhost:8090/api/sales/" });
  const sales = salesData.sales;

  return (
    <div className="sales-history">
      <h1>Sales</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson Employee Id</th>
            <th>Salesperson Name</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sales &&
            sales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>{sale.salesperson.employee_id}</td>
                  <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                  <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                  <td>{sale.automobile.vin}</td>
                  <td>{sale.price}</td>
                  <td>
                    <HandleDelete
                      url={`http://localhost:8090/api/sales/${sale.id}/`}
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
