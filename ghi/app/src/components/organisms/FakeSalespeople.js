import { useState, useEffect } from "react";
import FakeSalespeopleBio from "../molecules/FakeSalespeopleBio";

export default function FakeSalespeople() {
  const [fakePeople, setFakePeople] = useState([]);

  const getFakepeople = async () => {
    const url = "https://randomuser.me/api?results=9";
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setFakePeople(json.results);
    }
  };

  useEffect(() => {
    getFakepeople();
  }, []);

  return (
    <div className="row">
      <h1>Meet our Sales Team</h1>
      {fakePeople &&
        fakePeople.map((p) => {
          return <FakeSalespeopleBio p={p} />;
        })}
    </div>
  );
}
