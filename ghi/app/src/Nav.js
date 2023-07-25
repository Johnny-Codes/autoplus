import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <NavLink className="navbar-brand" to="/manufacturers">
          Manufacturers
        </NavLink>
        <NavLink className="navbar-brand" to="/manufacturers/add-manufacturer">
          Add Manufacturer
        </NavLink>
        <NavLink className="navbar-brand" to="/models">
          Car Models
        </NavLink>
        <NavLink className="navbar-brand" to="/models/add-model">
          Add Car Models
        </NavLink>
        <NavLink className="navbar-brand" to="/automobiles">
          Automobiles
        </NavLink>
        <NavLink className="navbar-brand" to="/automobiles/add-automobile">
          Add Automobile
        </NavLink>
        <NavLink className="navbar-brand" to="/technicians">
          Technicians
        </NavLink>
        <NavLink className="navbar-brand" to="/technicians/add-technician">
          Add Technician
        </NavLink>
        <NavLink className="navbar-brand" to="/appointments">
          Active Service Appointments
        </NavLink>
        <NavLink className="navbar-brand" to="/appointments/add-appointment">
          Add Service Appointment
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
