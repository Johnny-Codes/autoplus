import "./FakeSalespeopleBio.css";
export default function FakeSalespeopleBio(p) {
  const person = p.p;

  return (
    <div className="fake-salespeople col-3" key={person.cell}>
      <img
        src={`${person.picture.large}`}
        alt={person.name.first}
        className="fake-salesperson-image"
      />
      <p>
        {person.name.first} {person.name.last}
      </p>
      <hr></hr>
      <p>Contact</p>
      <p>{person.email}</p>
      <p>
        {person.phone} or {person.cell}
      </p>
    </div>
  );
}
