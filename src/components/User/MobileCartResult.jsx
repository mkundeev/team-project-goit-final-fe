// import { useState } from 'react';
import s from './User.module.css';
export default function MobileCartREsult({ data }) {
  console.log(data, new Date().getMilliseconds());
  return (
    <>
      {data.map(
        ({
          _id,

          topic,
          rightAnswers,
          wrongAnswers,
          percent,
        }) => {
          return (
            <div className={s.Cart} key={new Date().getMilliseconds()}>
              <h2>{topic}</h2>
              <ul>
                <li
                  style={{
                    backgroundColor:
                      topic === 'Testing theory' ? '#C13C37' : '#E38627',
                  }}
                >
                  Right answers: {rightAnswers}
                </li>
                <li
                  //   key={new Date().getMilliseconds()}
                  style={{
                    backgroundColor:
                      topic === 'Testing theory' ? '#C13C37' : '#E38627',
                  }}
                >
                  Wrong answers: {wrongAnswers}
                </li>
                <li
                  //   key={new Date().getMilliseconds()}
                  style={{
                    backgroundColor:
                      topic === 'Testing theory' ? '#C13C37' : '#E38627',
                  }}
                >
                  Percentage: {percent} %
                </li>
              </ul>
            </div>
          );
        }
      )}
    </>
  );
}
