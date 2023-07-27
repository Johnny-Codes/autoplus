import React, { useState, useEffect } from "react";
import FormInput from "../atoms/FormInput";
import CreateButton from "../molecules/CreateButton";
import HandleFormSubmit from "../../hooks/HandleFormSubmit";
import useApi from "../../hooks/useApi";
import FormOption from "../atoms/FormOption";

export default function CreateSale() {
  const [formData, setFormData] = useState({});
  const [carsForSale, setCarsForSale] = useState([]);

  const salespeopleData = useApi({
    url: "http://localhost:8090/api/salespeople/",
  });
  const salespeople = salespeopleData.salespeople;

  const customerData = useApi({ url: "http://localhost:8090/api/customers/" });
  const customers = customerData.customers;

  const getCarsForSale = async () => {
    const url = "http://localhost:8090/api/automobiles/";
    const newArr = [];
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        const autos = json.autos;
        for (const auto of autos) {
          if (auto.sold === false) {
            newArr.push(auto);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    setCarsForSale(newArr);
  };

  useEffect(() => {
    getCarsForSale();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const car of carsForSale) {
      if (car.id == formData.automobile) {
        const data = { sold: true };
        const json = JSON.stringify(data);
        const updateUrl = `http://localhost:8100/api/automobiles/${car.vin}/`;
        const fetchConfig = {
          method: "put",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const response = await fetch(updateUrl, fetchConfig);
        } catch (error) {
          console.log("error", error);
        }
      }
    }
    HandleFormSubmit({
      url: "http://localhost:8090/api/sales/",

      formData: formData,
    });
    setFormData({});
  };

  return (
    <div className="add-sale-form">
      <h1>Add Sale</h1>
      <form className="form" onSubmit={handleSubmit}>
        <select
          name="automobile"
          className="form-select"
          onChange={handleFormChange}
        >
          <option value="">Choose a VIN</option>
          {carsForSale &&
            carsForSale.map((car) => {
              return <FormOption key={car.vin} value={car.id} text={car.vin} />;
            })}
        </select>
        <select
          name="salesperson"
          onChange={handleFormChange}
          className="form-select"
        >
          <option value="">Choose a Salesperson</option>
          {salespeople &&
            salespeople.map((salesperson) => {
              return (
                <FormOption
                  key={salesperson.id}
                  value={salesperson.id}
                  text={`${salesperson.first_name} ${salesperson.last_name}`}
                />
              );
            })}
        </select>
        <select
          name="customer"
          className="form-select"
          onChange={handleFormChange}
        >
          <option value="">Select a Customer</option>
          {customers &&
            customers.map((customer) => {
              return (
                <FormOption
                  text={`${customer.first_name} ${customer.last_name}`}
                  value={customer.id}
                  key={customer.id}
                />
              );
            })}
        </select>
        <FormInput
          type="number"
          className="form-control"
          name="price"
          id="price"
          onChange={handleFormChange}
        />
        <CreateButton />
      </form>
    </div>
  );
}
