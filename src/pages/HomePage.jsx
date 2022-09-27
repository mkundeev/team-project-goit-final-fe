import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import { toast } from 'react-toastify';
import { BsArrowRight } from 'react-icons/bs';
import { useGetTestListQuery, useResetTestMutation } from 'app/testsApi';
import ModalTestConfirm from 'components/ModalTestConfirm/ModalTestConfirm';
import { getStartedTests } from 'app/selectors';
import { setUser } from 'app/reducer';
import Container from 'components/Container';
import s from './Home.module.css';

export default function HomePage() {
  const { data } = useGetTestListQuery();
  const [resetTest] = useResetTestMutation();
  const startedTests = useSelector(getStartedTests);
  const [tests, setTests] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameTest, setNameTest] = useState('');
  const [pathToTest, setPathToTest] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => setTests(data), [data]);

  const handleOpenModal = e => {
    const path = e.target.id;
    setPathToTest(path);
    const testWasStarted = startedTests.find(
      test => test.topic === e.target.innerText
    );

    if (!testWasStarted) {
      navigate(`/test/${path}`);
      return;
    }
    setIsOpenModal(true);
    setNameTest(e.target.innerText);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleClickYes = () => {
    setIsOpenModal(false);
    navigate(`/test/${pathToTest}`);
  };

  const handleClickNo = () => {
    resetTest(pathToTest)
      .unwrap()
      .then(data => {
        dispatch(setUser({ startedTests: data }));
        setIsOpenModal(false);
        navigate(`/test/${pathToTest}`);
      })
      .catch(data =>
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  };

  return (
    <main className={s.homeMain}>
      <Container>
        <h1 className={s.hidden}>Home</h1>
        <div className={s.textContainer}>
          <p className={s.text}>
            “Regression testing. What is it? <br /> If the system compiles,
            that's good, if it <br /> boots, that's great!”
          </p>
          <hr className={s.line} />
          <h2 className={s.title}>Linus Torvalds</h2>
          <p className={s.textTwo}>Linux kernel creator, hacker, 1969</p>
        </div>
        {tests ? (
          <ul className={s.list}>
            {tests
              .map(({ _id, topic }) => (
                <li className={s.item} key={_id}>
                  <button
                    type="button"
                    className={s.buttonModal}
                    onClick={handleOpenModal}
                    id={_id}
                  >
                    <Link to={`/test/${_id}`} className={s.link}>
                      <span className={s.spanText}>{topic}</span>
                    </Link>
                    <span className={s.span}>
                      <BsArrowRight className={s.svg} />
                    </span>
                  </button>
                </li>
              ))
              .reverse()}
          </ul>
        ) : (
          <></>
        )}
      </Container>
      {isOpenModal && (
        <ModalTestConfirm
          titleTest={nameTest}
          onClickYes={handleClickYes}
          onClickNo={handleClickNo}
          onCloseModal={onCloseModal}
        />
      )}
    </main>
  );
}
