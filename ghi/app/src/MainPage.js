import AddCustomer from "./components/organisms/AddCustomer";
import CustomerList from "./components/organisms/CustomerList";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The (not-so) premiere solution for automobile dealership management!
        </p>
      </div>
      <CustomerList />
    </div>
  );
}

export default MainPage;
