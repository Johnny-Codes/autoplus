import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from "./components/organisms/ManufacturersList";
import CreateManufacturer from "./components/organisms/CreateManufacturer";
import CarModelsList from "./components/organisms/CarModelsList";
import CreateCarModel from "./components/organisms/CreateCarModel";
import AutomobileList from "./components/organisms/AutomobilesList";
import CreateAutomobile from "./components/organisms/CreateAutomobile";
import AddTechnician from "./components/organisms/AddTechnician";
import TechnicianList from "./components/organisms/TechniciansList";
import CreateServiceAppointment from "./components/organisms/CreateServiceAppointment";
import ServiceAppointList from "./components/organisms/ServiceAppointmentList";
import ServiceHistoryList from "./components/organisms/ServiceHistoryList";
import AddSalesperson from "./components/organisms/AddSalesperson";
import SalespeopleList from "./components/organisms/SalespeopleList";
import CustomerList from "./components/organisms/CustomerList";
import AddCustomer from "./components/organisms/AddCustomer";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="add-manufacturer" element={<CreateManufacturer />} />
          </Route>
          <Route path="models">
            <Route index element={<CarModelsList />} />
            <Route path="add-model" element={<CreateCarModel />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="add-automobile" element={<CreateAutomobile />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="add-technician" element={<AddTechnician />} />
          </Route>
          <Route path="appointments">
            <Route index element={<ServiceAppointList />} />
            <Route
              path="add-appointment"
              element={<CreateServiceAppointment />}
            />
            <Route path="history" element={<ServiceHistoryList />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="add-salesperson" element={<AddSalesperson />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="add-customer" element={<AddCustomer />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
