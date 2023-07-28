import React, { useState, useEffect } from "react";
import UpdateApptButton from "../molecules/UpdateApptButton";
import FormatDate from "../molecules/FormatDate";
import FormatTime from "../molecules/FormatTime";
import HandleDelete from "../molecules/HandleDelete";

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

        const appts = json.appointments;
        for (const appt of appts) {
          if (appt.status === "Created") {
            activeAppts.push(appt);
          }
        }
      }
      setActiveAppt(activeAppts);
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
              const formattedDate = FormatDate(appt.date_time);
              const formattedTime = FormatTime(appt.date_time);
              return (
                <tr key={appt.id}>
                  <td>{appt.vin}</td>
                  <td>{sold.includes(appt.vin) ? "Yes" : "No"}</td>
                  <td>{appt.customer}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
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
                    <HandleDelete
                      url={`http://localhost:8070/api/appointments/${appt.id}/`}
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
