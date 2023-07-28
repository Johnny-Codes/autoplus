import React from "react";
import useApi from "../../hooks/useApi";
import HandleDelete from "../molecules/HandleDelete";

export default function CustomerList() {
  const custData = useApi({ url: "http://localhost:8090/api/customers/" });
  const customers = custData.customers;

  return (
    <div className="customer-list">
      <h1>Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <td>Name</td>
            <td>Address</td>
            <td>Phone Number</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{`${customer.first_name} ${customer.last_name}`}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone_number}</td>
                  <td>
                    <HandleDelete
                      url={`http://localhost:8090/api/customers/${customer.id}/`}
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
