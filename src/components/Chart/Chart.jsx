import React from 'react';

import { PieChart } from 'react-minimal-pie-chart';
import s from './Chart.module.css';
import Svg from './Svg';
import Container from 'components/Container';
import SimonCat from './SimonCat';
import { Link } from 'react-router-dom';

export default function Chart({ result }) {
  const { rightAnswers, wrongAnswers, testId } = result;

  const dataChart = [
    {
      title: 'Incorrect',
      value: (wrongAnswers / 12) * 100,
      color: '#D7D7D7 ',
    },
    {
      title: 'Correct',
      value: (rightAnswers / 12) * 100,
      color: '#ff6b09',
    },
  ];

  return (
    <div className={s.ChartTest}>
      {result && (
        <Container>
          <h1 className={s.title}>Results</h1>
          <p className={s.titleText}>{'[ Testing theory_]'}</p>
          <div className={s.Chart}>
            <PieChart data={dataChart} viewBoxSize={[100, 100]} />

            <div className={s.valuesBlock}>
              {rightAnswers > 0 && (
                <div className={s.correctBlock}>
                  <div className={s.correctInnerBlock}>
                    <Svg />
                    <div className={s.correctColor}></div>
                    <p className={s.correctPercentage}>
                      {Math.round(dataChart[1].value)}%
                    </p>
                  </div>

                  <p className={s.correctText}>Correct</p>
                </div>
              )}

              {wrongAnswers > 0 && (
                <div className={s.incorrectBlock}>
                  <div className={s.incorrectInnerBlock}>
                    <Svg />
                    <div className={s.incorrectColor}></div>
                    <p className={s.incorrectPercentage}>
                      {Math.round(dataChart[0].value)}%
                    </p>
                  </div>
                  <p className={s.correctText}>Incorrect</p>
                </div>
              )}
            </div>
          </div>
          <ul className={s.list}>
            <li className={s.item}>Correct answers - {rightAnswers}</li>
            <li className={s.item}>
              Total questions - {rightAnswers + wrongAnswers}
            </li>
          </ul>
          <SimonCat data={rightAnswers} />
          <p className={s.materials}>
            But you still need to learn some materials.
          </p>
          <div className={s.cartLink}>
            <Link to={`/test/${testId}`} className={s.link}>
              Try again
            </Link>
          </div>
        </Container>
      )}
    </div>
  );
}
