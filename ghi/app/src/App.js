import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from "./components/organisms/ManufacturersList";
import CreateManufacturer from "./components/organisms/CreateManufacturer";
import CarModelsList from "./components/organisms/CarModelsList";
import CreateCarModel from "./components/organisms/CreateCarModel";
import AutomobileList from "./components/organisms/AutomobilesList";
import CreateAutomobile from "./components/organisms/CreateAutomobile";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
            <Route path="create" element={<CreateManufacturer />} />
          </Route>
          <Route path="models">
            <Route index element={<CarModelsList />} />
            <Route path="add-model" element={<CreateCarModel />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="add-automobile" element={<CreateAutomobile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
