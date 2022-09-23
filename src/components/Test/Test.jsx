import React, { useEffect, useState } from 'react';

import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useSetAnswersMutation } from 'app/testsApi';

import TestCard from '../TestCard/TestCard';
import s from './Test.module.css';
import { useSelector } from 'react-redux';
import { getStartedTests } from 'app/selectors';

export default function Test({ testId }) {
  const tests = useSelector(getStartedTests);
  const [currentTest, setCurrentTest] = useState('');
  const [checkedValue, setCheckedValue] = useState('');
  const [setAnswers] = useSetAnswersMutation();

  useEffect(() => {
    const test = tests?.find(test => test.testId === testId);
    setCurrentTest(test);
    if (currentTest) {
      setCheckedValue(currentTest?.answers[currentTest.currentIndex]?.answer);
    }
  }, [currentTest, testId, tests]);

  const handleChangeDecrement = () => {
    const isCheckedValue = currentTest.tests[
      currentTest.currentIndex
    ].answers.find(el => el === checkedValue);

    if (!isCheckedValue) {
      setAnswers({
        testId: currentTest.testId,
        currentIndex: currentTest.currentIndex - 1,
        questionId: currentTest.tests[currentTest.currentIndex].questionId,
        answer: 'Nothing was checked',
      });
    }

    setAnswers({
      testId: currentTest.testId,
      currentIndex: currentTest.currentIndex - 1,
      questionId: currentTest.tests[currentTest.currentIndex].questionId,
      answer: checkedValue,
    });
  };

  const handleChangeIncrement = () => {
    if (!checkedValue) {
      alert('Select one of the answers');
      return;
    }

    setAnswers({
      testId: currentTest.testId,
      currentIndex: currentTest.currentIndex + 1,
      questionId: currentTest.tests[currentTest.currentIndex].questionId,
      answer: checkedValue,
    });
  };

  return (
    <>
      {currentTest && (
        <div className={s.container}>
          <div className={s.wrapTop}>
            <div className={s.testNameWrap}>
              <p className={s.testName}>[ _ ]</p>
            </div>
            <button className={s.buttonFinish}>Finish test</button>
          </div>
          <TestCard
            currentIndex={currentTest.currentIndex}
            test={currentTest.tests}
            checkedValue={checkedValue}
            setCheckedValue={setCheckedValue}
          />
          <ul className={s.paginationBtnWrap}>
            <li>
              <button
                className={s.paginationButton}
                type="button"
                disabled={currentTest.currentIndex === 0}
                onClick={handleChangeDecrement}
              >
                <BsArrowLeft className={s.iconBtn} />
                <span className={s.questionsNextPrev}>Previous question</span>
              </button>
            </li>
            <li>
              <button
                className={s.paginationButton}
                type="button"
                disabled={
                  currentTest.currentIndex === currentTest.tests.length - 1
                }
                onClick={handleChangeIncrement}
              >
                <span className={s.questionsNextPrev}>Next question</span>{' '}
                <BsArrowRight className={s.iconBtn} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
