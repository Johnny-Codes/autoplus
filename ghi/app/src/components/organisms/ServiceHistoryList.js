import React, { useState, useEffect } from "react";

export default function ServiceHistoryList() {
  const [sold, setSold] = useState([]);
  const [appts, setAppts] = useState([]);
  const [filteredAppts, setFilteredAppts] = useState([]);

  const handleSearchBar = (e) => {
    setFilteredAppts(appts);
    const filterAppts = appts.filter((appt) =>
      appt.vin.includes(e.target.value)
    );
    setFilteredAppts(filterAppts);
  };

  const getAutoVOData = async () => {
    const url = "http://localhost:8070/api/automobiles/";
    const response = await fetch(url);
    const soldVins = [];
    if (response.ok) {
      const json = await response.json();
      const autos = json.autos;

      for (const auto of autos) {
        if (auto.sold === true) {
          soldVins.push(auto.vin);
        }
      }
      setSold(soldVins);
    }
  };

  const getAppts = async () => {
    const url = "http://localhost:8070/api/appointments/";
    try {
      const activeAppts = [];
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        const appts = json.appointments;
        for (const appt of appts) {
          activeAppts.push(appt);
        }
      }
      setAppts(activeAppts);
      setFilteredAppts(activeAppts);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAutoVOData();
    getAppts();
  }, []);

  return (
    <div className="appointment-list">
      <h1>Service History</h1>
      <input
        type="text"
        placeholder="Search by VIN"
        onChange={handleSearchBar}
        className="form-control"
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>VIP?</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppts &&
            filteredAppts.map((appt) => {
              return (
                <tr key={appt.id}>
                  <td>{appt.vin}</td>
                  <td>{sold.includes(appt.vin) ? "Yes" : "No"}</td>
                  <td>{appt.customer}</td>
                  <td>{appt.date_time}</td>
                  <td>{appt.date_time}</td>
                  <td>{appt.technician.employee_id}</td>
                  <td>{appt.reason}</td>
                  <td>{appt.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
