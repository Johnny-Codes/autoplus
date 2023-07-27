import useApi from "../../hooks/useApi";
import EditManufacturerButton from "../molecules/EditManufacturerButton";
export default function ManufacturersList() {
  const manufacturers = useApi({
    url: "http://localhost:8100/api/manufacturers/",
  });
  const manufacturerList = manufacturers.manufacturers;

  return (
    <div>
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {manufacturerList &&
            manufacturerList.map((manufacturer) => {
              return (
                <tr key={manufacturer.href}>
                  <td>{manufacturer.name}</td>
                  <td value={manufacturer.id}>
                    <EditManufacturerButton id={manufacturer.id} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
