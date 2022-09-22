import React, { useState } from 'react';

import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { questions } from '../TestCard/questions';
import { useSetAnswersMutation } from 'app/testsApi';

import TestCard from '../TestCard/TestCard';
import s from './Test.module.css';

export default function Test({ test }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [setAnswers] = useSetAnswersMutation();

  console.log('test', test);

  const handleChangeDecrement = () => {
    setCurrentQuestion(currentQuestion - 1);
    setAnswers({
      testId: test.testId,
      currentIndex: currentQuestion,
      questionId: test[currentQuestion].questionId,
      answer,
    });
  };

  const handleChangeIncrement = () => {
    setCurrentQuestion(currentQuestion + 1);
    setAnswers();
  };

  return (
    <div className={s.container}>
      <div className={s.wrapTop}>
        <div className={s.testNameWrap}>
          <p className={s.testName}>[ Testing theory_ ]</p>
        </div>
        <button className={s.buttonFinish}>Finish test</button>
      </div>
      <TestCard currentQuestion={currentQuestion} setAnswer={setAnswer} />
      <ul className={s.paginationBtnWrap}>
        <li>
          <button
            className={s.paginationButton}
            type="button"
            disabled={currentQuestion === 0}
            onClick={handleChangeDecrement}
          >
            <BsArrowLeft className={s.iconBtn} />
            Previous question
          </button>
        </li>
        <li>
          <button
            className={s.paginationButton}
            type="button"
            disabled={currentQuestion === questions.length - 1}
            onClick={handleChangeIncrement}
          >
            Next question <BsArrowRight className={s.iconBtn} />
          </button>
        </li>
      </ul>
    </div>
  );
}
