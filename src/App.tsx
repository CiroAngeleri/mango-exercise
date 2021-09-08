import React, { useEffect, useState } from "react";
import { Range } from "./components/Range";
import "./index.css";

export default function App() {
  const [range, setRange] = useState([]);
  useEffect(() => {
    const fetchRange = async () => {
      const response = await fetch("https://6137c185eac1410017c1847d.mockapi.io/range");
      const data = await response.json();
      setRange(data);
    };
    fetchRange();
  }, []);

  return (
    <div className="App">
      <Range min={5000} max={8000} />
      <br />
      <br />
      <Range range={range} />
    </div>
  );
}
