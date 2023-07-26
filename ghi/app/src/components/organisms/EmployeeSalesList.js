import React, { useState } from "react";
import FormOption from "../atoms/FormOption";
import useApi from "../../hooks/useApi";

export default function EmployeeSalesList() {
  const [employeeSales, setEmployeeSales] = useState([]);
  const empData = useApi({ url: "http://localhost:8090/api/salespeople/" });
  const salespeople = empData.salespeople;

  const salesData = useApi({ url: "http://localhost:8090/api/sales/" });
  const salesCompleted = salesData.sales;

  const handleChange = (e) => {
    const empId = e.target.value;
    const newArr = [];
    for (const sale of salesCompleted) {
      if (sale.salesperson.id == empId) {
        newArr.push(sale);
      }
    }
    console.log("new arr", newArr);
    setEmployeeSales(newArr);
    console.log("employee sales", employeeSales);
  };

  return (
    <div className="employee-sales">
      <h1>Salesperson Sales</h1>
      <select
        name="salespeople"
        className="form-select"
        onChange={handleChange}
      >
        <option value="">Select a Saleperson</option>
        {salespeople &&
          salespeople.map((sales) => {
            return (
              <FormOption
                key={sales.id}
                text={`${sales.first_name} ${sales.last_name}`}
                value={sales.id}
              />
            );
          })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {employeeSales &&
            employeeSales.map((sales) => {
              return (
                <tr>
                  <td>{`${sales.salesperson.first_name} ${sales.salesperson.last_name}`}</td>
                  <td>{`${sales.customer.first_name} ${sales.customer.last_name}`}</td>
                  <td>{sales.automobile.vin}</td>
                  <td>{sales.price}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
