import React, { useState } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
// import { useDispatch } from 'react-redux';
// import { useGetTestListQuery } from '../../app/testsApi';
import { questions } from '../TestCard/questions';
import TestCard from '../TestCard/TestCard';
import s from './Test.module.css';

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checkedValue, setCheckedValue] = useState('');
  // const [answersArr, setAnswersArr] = useState([]);
  // const { data: testList } = useGetTestListQuery();
  // console.log('testList', testList);
  // const dispatch = useDispatch();
  // console.log('answersArr', answersArr);

  const handleChangeDecrement = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleChangeIncrement = () => {
    if (!checkedValue) {
      alert('Select one of the answers');
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
    // if (
    //   answersArr.find(el => el.id === questions[currentQuestion].questionId)
    // ) {
    //   setAnswersArr(prevState =>
    //     prevState.map(el =>
    //       el.id === questions[currentQuestion].questionId
    //         ? { id: el.id, checkedValue: checkedValue }
    //         : el
    //     )
    //   );
    setCheckedValue('');

    // setAnswersArr(prevState => [
    //   ...prevState,
    //   { id: questions[currentQuestion].questionId, checkedValue },
    // ]);
    // dispatch(addAnswer(answersArr));
    setCheckedValue('');
  };

  // useEffect(() => {}, []);

  return (
    <div className={s.container}>
      <div className={s.wrapTop}>
        <div className={s.testNameWrap}>
          <p className={s.testName}>[ Testing theory_ ]</p>
        </div>
        <button className={s.buttonFinish}>Finish test</button>
      </div>
      <TestCard
        currentQuestion={currentQuestion}
        setCheckedValue={setCheckedValue}
        checkedValue={checkedValue}
      />
      <ul className={s.paginationBtnWrap}>
        <li>
          <button
            className={s.paginationButton}
            type="button"
            disabled={currentQuestion === 0}
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
            disabled={currentQuestion === questions.length - 1}
            onClick={handleChangeIncrement}
          >
            <span className={s.questionsNextPrev}>Next question</span>{' '}
            <BsArrowRight className={s.iconBtn} />
          </button>
        </li>
      </ul>
    </div>
  );
}
