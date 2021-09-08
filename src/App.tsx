import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
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
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/exercise1" />
          </Route>
          <Route exact path="/exercise1">
            <Range 
              initialStartPercentage={10}
              initialEndPercentage={80}
              min={5000}
              max={8000} 
              currencyLabel="€"
            />
          </Route>
          <Route exact path="/exercise2">
            {range.length 
              ? <Range
                  initialStartPercentage={20}
                  initialEndPercentage={70}
                  range={range}
                  currencyLabel="€"
                /> 
              : 'Loading...'
            }
          </Route>
        </Switch>
        <Link to="/exercise1">Go to exercise 1</Link>
        <br />
        <br />
        <Link to="/exercise2">Go to exercise 2</Link>
      </div>
    </Router>
  );
}
