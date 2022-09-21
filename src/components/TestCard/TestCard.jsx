import React from 'react';

import { questions } from './questions';
import s from '../Test/Test.module.css';

export default function TestCard({
  currentQuestion,
  setCheckedValue,
  checkedValue,
}) {
  const handleChangeChecked = e => {
    setCheckedValue(e.target.value);
  };

  return (
    <div className={s.testWrap}>
      <p className={s.questionCounter}>
        question{' '}
        <span className={s.currentQuestion}>
          {questions[currentQuestion].questionId}
        </span>
        /{questions.length}
      </p>
      <h3 className={s.question}>{questions[currentQuestion].question}</h3>

      <form className={s.formTest}>
        {questions[currentQuestion].answers.map(el => (
          <label key={el} className={s.formLabel}>
            <input
              className={s.formInput}
              type="radio"
              value={el}
              onChange={handleChangeChecked}
              checked={checkedValue === el}
            />
            {el}
          </label>
        ))}
      </form>
    </div>
  );
}
