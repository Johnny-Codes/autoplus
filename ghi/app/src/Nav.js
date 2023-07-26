import { NavLink } from "react-router-dom";
import "./Nav.css";
function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid flex-wrap">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="inventoryMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Inventory
          </button>
          <ul className="dropdown-menu" aria-labelledby="inventoryMenuButton">
            <li>
              <NavLink className="dropdown-item" to="/manufacturers">
                Manufacturers
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/manufacturers/add-manufacturer"
              >
                Add Manufacturer
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <NavLink className="dropdown-item" to="/models">
                Car Models
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/models/add-model">
                Add Car Models
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <NavLink className="dropdown-item" to="/automobiles">
                Automobiles
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/automobiles/add-automobile"
              >
                Add Automobile
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="serviceMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Service
          </button>
          <ul className="dropdown-menu" aria-labelledby="serviceMenuButton">
            <li>
              <NavLink className="dropdown-item" to="/technicians">
                Technicians
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/technicians/add-technician"
              >
                Add Technician
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <NavLink className="dropdown-item" to="/appointments">
                Active Service Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/appointments/add-appointment"
              >
                Add Service Appointment
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/appointments/history">
                Service History
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="salesMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sales
          </button>
          <ul className="dropdown-menu" aria-labelledby="salesMenuButton">
            <li>
              <NavLink className="dropdown-item" to="/salespeople">
                Salespeople
              </NavLink>
            </li>
            <li>
              <NavLink
                className="dropdown-item"
                to="/salespeople/add-salesperson"
              >
                Add Salesperson
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <NavLink className="dropdown-item" to="/customers">
                Customer List
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/customers/add-customer">
                Add Customer
              </NavLink>
            </li>
            <hr></hr>
            <li>
              <NavLink className="dropdown-item" to="/sales">
                Sales List
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/sales/employee-sales">
                Employee Sales
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/sales/add-sale">
                Add Sale
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
