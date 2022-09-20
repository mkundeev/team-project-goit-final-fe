import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import s from "./Chart.module.css";
import Svg from "./Svg";

export default function Chart() {
  const data = {
    correctAnswer: 9,
    rejectAnswer: 3,
  };
  const dataChart = [
    {
      title: "Correct",
      value: (data.correctAnswer / 12) * 100,
      color: " #ff6b09",
    },
    {
      title: "Incorrect",
      value: (data.rejectAnswer / 12) * 100,
      color: "#D7D7D7",
    },
  ];

  return (
    <div className={s.container}>
      <h1>Results</h1>
      <div className={s.Chart}>
        <PieChart
          data={dataChart}
          label={({ dataEntry }) => `${dataEntry.value}%  ${dataEntry.title}`}
          labelStyle={(index) => ({
            fill: "#000000",
            fontSize: "8px",
            fontFamily: "sans-serif",
          })}
          radius={42}
          labelPosition={112}
        />
      </div>

      <ul>
        <li>
          <p>Correct answers - {data.correctAnswer}</p>
        </li>

        <li>
          <p> Total questions - {data.rejectAnswer + data.correctAnswer}</p>
        </li>
      </ul>
    </div>
  );
}
