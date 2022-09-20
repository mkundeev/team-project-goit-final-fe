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
    <div className={s.Chart}>
      {/* {values.totalAnswersCount > 0 && ( */}
      <PieChart data={dataChart} viewBoxSize={[100, 100]} />
      {/* )} */}
      {/* {!values.totalAnswersCount && <span>No data</span>} */}

      <div className={s.valuesBlock}>
        {/* {values.correctPercentage > 0 && ( */}
        <div className={s.correctBlock}>
          <div className={s.correctInnerBlock}>
            <Svg />
            <div className={s.correctColor}></div>
            <p className={s.correctPercentage}>{data.correctAnswer}%</p>
          </div>

          <p className={s.correctText}>Correct</p>
        </div>
        {/* )} */}

        {/* {values.incorrectPercentage > 0 && ( */}
        <div className={s.incorrectBlock}>
          <div className={s.incorrectInnerBlock}>
            <Svg />
            <div className={s.incorrectColor}></div>
            <p className={s.incorrectPercentage}>
              {data.correctAnswer + data.rejectAnswer}%
            </p>
          </div>
          <p className={s.correctText}>Incorrect</p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
