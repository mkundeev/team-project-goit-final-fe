import React from 'react';

import s from '../Test/Test.module.css';

export default function TestCard({
  currentIndex,
  test,
  checkedValue,
  setCheckedValue,
}) {
  const handleChangeChecked = e => {
    setCheckedValue(e.target.value);
  };
  return (
    <div className={s.testWrap}>
      <p className={s.questionCounter}>
        question <span className={s.currentQuestion}>{currentIndex + 1}</span>/
        {test.length}
      </p>
      <h3 className={s.question}>{test[currentIndex].question}</h3>

      <form className={s.formTest}>
        {test[currentIndex].answers.map(el => (
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
