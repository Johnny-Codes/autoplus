import React, { useState, useEffect } from "react";
import UpdateApptButton from "../molecules/UpdateApptButton";

export default function ServiceAppointList() {
  const [sold, setSold] = useState([]);
  const [activeAppt, setActiveAppt] = useState([]);

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

  const getActiveAppts = async () => {
    const url = "http://localhost:8070/api/appointments/";
    try {
      const activeAppts = [];
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        console.log("resposne json", json);
        const appts = json.appointments;
        for (const appt of appts) {
          if (appt.status === "Created") {
            activeAppts.push(appt);
            console.log("active? ", appt.vin);
          }
        }
      }
      setActiveAppt(activeAppts);
      console.log("active appts", activeAppt);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAutoVOData();
    getActiveAppts();
  }, []);

  return (
    <div className="appointment-list">
      <h1>Appointments</h1>
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
          {activeAppt &&
            activeAppt.map((appt) => {
              return (
                <tr key={appt.id}>
                  <td>{appt.vin}</td>
                  <td>{sold.includes(appt.vin) ? "Yes" : "No"}</td>
                  <td>{appt.customer}</td>
                  <td>{appt.date_time}</td>
                  <td>{appt.date_time}</td>
                  <td>{appt.technician.employee_id}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <UpdateApptButton
                      id={appt.id}
                      status="Canceled"
                      text="Cancel"
                      className="cancel-appt-button"
                    />
                    <UpdateApptButton
                      id={appt.id}
                      status="Finished"
                      text="Finish"
                      className="finish-appt-button"
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
