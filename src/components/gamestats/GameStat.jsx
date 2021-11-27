import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Stats from "./Stats";

const GameStat = ({ recaps }) => {
  const { recapParam } = useParams();
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const index =
      recapParam === undefined
        ? recaps.length - 1
        : recapParam === "total"
        ? recaps.length - 1
        : recapParam - 1;
    setSelected(recaps[index]);
  }, [recapParam, recaps]);
  return (
    <div>
      {selected && (
        <>
          <Stats
            dataStat1={selected.awayFOW}
            dataStat2={selected.homeFOW}
            title="FOW"
          />
          <Stats
            dataStat1={selected.awayG}
            dataStat2={selected.homeG}
            title="G"
          />
        </>
      )}
    </div>
  );
};

export default GameStat;
