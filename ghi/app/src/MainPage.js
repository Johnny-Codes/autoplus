import { useState, useEffect } from "react";
import Button from "./components/atoms/Button";
import FakeSalespeople from "./components/organisms/FakeSalespeople";
import "./MainPage.css";

function MainPage() {
  const [carsForSale, setCarsForSale] = useState([]);
  const [selectedCar, setSelectedCar] = useState([]);

  const getCarsForSale = async () => {
    const url = "http://localhost:8100/api/automobiles/";
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
    setSelectedCar([...selectedCar, newArr[0]]);
  };

  useEffect(() => {
    getCarsForSale();
  }, []);

  const handleViewCar = async (e) => {
    const url = `http://localhost:8100${e.target.value}`;
    const buttons = document.querySelectorAll("button");
    for (const b of buttons) {
      b.classList.remove("selected-car");
    }

    const button = e.target;

    button.classList.add("selected-car");
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setSelectedCar([json]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="row">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The premiere solution for automobile dealership management!
          </p>
        </div>
      </div>
      <div className="col-lg-8">
        <h1>Vehicles for Sale</h1>
        {carsForSale?.length === 0 ? (
          <p>We currently have no cars available for sale</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Year</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {carsForSale &&
                carsForSale?.map((car) => {
                  return (
                    <tr key={car.href} onClick={handleViewCar}>
                      <td>{car.model.manufacturer.name}</td>
                      <td>{car.model.name}</td>
                      <td>{car.year}</td>
                      <td>
                        <Button text="View" value={car.href} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      {carsForSale?.length === 0 ? (
        <p></p>
      ) : (
        <div className="col-lg-4 car-detail-view ">
          {selectedCar &&
            selectedCar.map((car) => {
              return (
                <div key={car.id}>
                  <h2>
                    {car.year} {car.model.manufacturer.name} {car.model.name}
                  </h2>
                  <hr></hr>

                  <img
                    className="car-detail-image"
                    src={`${car.model.picture_url}`}
                    alt={`${car.model.name}`}
                  />
                  <hr></hr>

                  <h4>Details</h4>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Color</th>
                        <th>VIN</th>
                        <th>Miles</th>
                        <th>Seats</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{car.color}</td>
                        <td>{car.vin}</td>
                        <td>100,000</td>
                        <td>12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      )}
      <div className="col-12">
        <FakeSalespeople />
      </div>
    </div>
  );
}

export default MainPage;
