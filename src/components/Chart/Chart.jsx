import React from 'react';

import { PieChart } from 'react-minimal-pie-chart';
import s from './Chart.module.css';
import Svg from './Svg';
import Container from 'components/Container';
import SimonCat from './SimonCat';
import { Link } from 'react-router-dom';

export default function Chart() {
  const data = {
    correctAnswer: 9,
    rejectAnswer: 3,
  };
  const dataChart = [
    {
      title: 'Incorrect',
      value: (data.rejectAnswer / 12) * 100,
      color: '#D7D7D7 ',
    },
    {
      title: 'Correct',
      value: (data.correctAnswer / 12) * 100,
      color: '#ff6b09',
    },
  ];

  return (
    <div className={s.ChartTest}>
      <Container>
        <h1 className={s.title}>Results</h1>
        <p className={s.titleText}>{'[ Testing theory_]'}</p>
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
                <p className={s.correctPercentage}>{dataChart[1].value}%</p>
              </div>

              <p className={s.correctText}>Correct</p>
            </div>
            {/* )} */}

            {/* {values.incorrectPercentage > 0 && ( */}
            <div className={s.incorrectBlock}>
              <div className={s.incorrectInnerBlock}>
                <Svg />
                <div className={s.incorrectColor}></div>
                <p className={s.incorrectPercentage}>{dataChart[0].value}%</p>
              </div>
              <p className={s.correctText}>Incorrect</p>
            </div>
            {/* )} */}
          </div>
        </div>
        <ul className={s.list}>
          <li className={s.item}>Correct answers - {data.correctAnswer}</li>
          <li className={s.item}>
            Total questions - {data.correctAnswer + data.rejectAnswer}
          </li>
        </ul>
        <SimonCat data={data.correctAnswer} />
        <p className={s.materials}>
          But you still need to learn some materials.
        </p>
        <div className={s.cartLink}>
          <Link to={'/test/:testId'} className={s.link}>
            Try again
          </Link>
        </div>
      </Container>
    </div>
  );

