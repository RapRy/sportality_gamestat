import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import GameStat from "./components/gamestats/GameStat";

export function Recaps({ recaps, handleClick }) {
  return (
    <div>
      {recaps.map((recap) => (
        <Link
          key={recap.periodNumber}
          to={recap.periodNumber === 0 ? "/total" : `/${recap.periodNumber}`}
          onClick={() => handleClick(recap.periodNumber)}
        >
          {recap.periodNumber === 0 ? "Total" : recap.periodNumber}
        </Link>
      ))}
    </div>
  );
}

function App() {
  const [showRecaps, setShowRecaps] = useState(false);
  const [recaps, setRecaps] = useState([]);
  const [recap, setRecap] = useState(0);

  const fetchData = async () => {
    const res = await fetch("./api/12771.json");
    const data = await res.json();

    const arr = Object.values(data.recaps);
    setRecaps(arr);
  };

  const handleClick = useCallback((periodNumber) => {
    setRecap(periodNumber);
  }, []);

  const handleClickDrop = () => {
    setShowRecaps((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <span onClick={handleClickDrop}>{recap === 0 ? "Total" : recap}</span>
          {showRecaps && <Recaps recaps={recaps} handleClick={handleClick} />}
        </div>
        <Routes>
          <Route index element={<GameStat recaps={recaps} />} />
          <Route path="/:recapParam" element={<GameStat recaps={recaps} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
