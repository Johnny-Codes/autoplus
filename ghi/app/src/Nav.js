import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid flex-wrap">
        <NavLink className="navbar-brand" to="/">
          CarCar |
        </NavLink>
        <NavLink className="navbar-brand" to="/manufacturers">
          Manufacturers |
        </NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/add-manufacturer">
          Add Manufacturer |
        </NavLink>
        <NavLink className="navbar-brand" to="/models">
          Car Models |
        </NavLink>
        <NavLink className="navbar-brand" to="/models/add-model">
          Add Car Models |
        </NavLink>
        <NavLink className="navbar-brand" to="/automobiles">
          Automobiles |
        </NavLink>
        <NavLink className="navbar-brand" to="/automobiles/add-automobile">
          Add Automobile |
        </NavLink>
        <NavLink className="navbar-brand" to="/technicians">
          Technicians |
        </NavLink>
        <NavLink className="navbar-brand" to="/technicians/add-technician">
          Add Technician |
        </NavLink>
        <NavLink className="navbar-brand" to="/appointments">
          Active Service Appointments |
        </NavLink>
        <NavLink className="navbar-brand" to="/appointments/add-appointment">
          Add Service Appointment |
        </NavLink>
        <NavLink className="navbar-brand" to="/appointments/history">
          Service History |
        </NavLink>
        <NavLink className="navbar-brand" to="/salespeople">
          Salespeople |
        </NavLink>
        <NavLink className="navbar-brand" to="/salespeople/add-salesperson">
          Add Salesperson |
        </NavLink>
        <NavLink className="navbar-brand" to="/customers">
          Customer List |
        </NavLink>
        <NavLink className="navbar-brand" to="/customers/add-customer">
          Add Customer |
        </NavLink>
        <NavLink className="navbar-brand" to="/sales">
          Sales List |
        </NavLink>
        <NavLink className="navbar-brand" to="/sales/employee-sales">
          Employee Sales |
        </NavLink>
        <NavLink className="navbar-brand" to="/sales/add-sale">
          Add Sale |
        </NavLink>
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
