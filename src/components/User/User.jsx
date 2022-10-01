import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import s from './User.module.css';
import Container from 'components/Container';
import UserChart from './UserChart';
import MobileCartREsult from './MobileCartResult';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeleteTestFromSatisticMutation,useResetTestMutation } from 'app/testsApi';
import { getStartedTests } from 'app/selectors';
import ModalTestConfirm from 'components/ModalTestConfirm/ModalTestConfirm';
import { setUser } from 'app/reducer';


export default function User({ data }) {
  const [ amountSort, setAmountSort ] = useState({});
  const [resetTest] = useResetTestMutation();
  const [topicSort, setTopicSort] = useState(true);
  const [dateSort, setDateSort] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const [ deleteTest ] = useDeleteTestFromSatisticMutation();
  const [ pathToTest, setPathToTest ] = useState('');
   const [isOpenModal, setIsOpenModal] = useState(false);
  const [nameTest, setNameTest] = useState('');
  const startedTests = useSelector(getStartedTests);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => setFilteredData(data), [data]);
  const sortByAmount = property => {
    let filteredData = [];
    if (!amountSort.hasOwnProperty(property)) {
      setAmountSort({ [property]: false });
    }
    if (amountSort[property]) {
      filteredData = [...data].sort((a, b) => a[property] - b[property]);
      setAmountSort({ [property]: false });
    } else {
      filteredData = [...data].sort((a, b) => b[property] - a[property]);
      setAmountSort({ [property]: true });
    }

    setFilteredData(filteredData);
  };
  const sortByDate = () => {
    let filteredData = [];
    if (dateSort) {
      filteredData = [...data].sort((a, b) => {
        const newDateA = new Date(a.createAt);
        const newDateB = new Date(b.createAt);
        return newDateB - newDateA;
      });
      setDateSort(!dateSort);
    } else {
      filteredData = [...data].sort((a, b) => {
        const newDateA = new Date(a.createAt);
        const newDateB = new Date(b.createAt);
        return newDateA - newDateB;
      });
      setDateSort(!dateSort);
    }

    setFilteredData(filteredData);
  };
  const sortByTopic = () => {
    let filteredData = [];
    if (topicSort) {
      filteredData = [...data].sort((a, b) => a.topic.localeCompare(b.topic));
      setTopicSort(!topicSort);
    } else {
      filteredData = [...data].sort((a, b) => b.topic.localeCompare(a.topic));
      setTopicSort(!topicSort);
    }

    setFilteredData(filteredData);
  };

  const totalProcent = data.reduce((acc, el) => acc + Number(el.percent), 0);

  const arr = (test, string) => {
    data.map(el => {
      return el.topic === string ? test.push(el.topic, el.testId) : null;
    });
  };

  const handleClick = e => {
    deleteTest(e.currentTarget.id);
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
    document.body.style.overflow = 'scroll';
  };

   const handleOpenModal = e => {
    document.body.style.overflow = 'hidden';
     const path = e.currentTarget.id;
     setPathToTest(path);
    const testWasStarted = startedTests.find(
      test => test.topic === e.target.dataset.topic
    );
    
    if (!testWasStarted) {
      navigate(`/test/${path}`);
      return;
    }
    
    setIsOpenModal(true);
    setNameTest(testWasStarted.topic);
    };
    
   const onCloseModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = 'scroll';
  };

  const handleClickYes = () => {
    setIsOpenModal(false);
    navigate(`/test/${pathToTest}`);
    document.body.style.overflow = 'scroll';
  };


  const QaTesting = [];
  const testing = [];
  arr(QaTesting, 'QA technical training');
  arr(testing, 'Testing theory');

  const newQa = [...new Set(QaTesting)];

  const newTest = [ ...new Set(testing) ];


  return (
    <div className={s.user}>
      {data.length ? (
        <Container>
          <ul className={s.list}>
            <li className={s.itemT} id={newQa[1]}>
              <button type="button" className={s.buttonT} id={newTest[1]} onClick={handleOpenModal} data-topic={newTest[ 0 ]}>
                <Link className={s.linkT} data-topic={newTest[ 0 ]}>
                  {newTest[0]}
                </Link>
              </button>
            </li>
            <li className={s.itemQ} id={newTest[1]}>
              <button type="button" className={s.buttonQ} id={newQa[1]} onClick={handleOpenModal} data-topic={newQa[ 0 ]}>
                <Link  className={s.linkQ} data-topic={newQa[ 0 ]}>
                  {newQa[0]}
                </Link>
              </button>
            </li>
          </ul>
          <MobileCartREsult data={data} />
          <div className={s.wrapTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={sortByDate}>Date</th>
                  <th onClick={sortByTopic}>Topic</th>
                  <th onClick={() => sortByAmount('rightAnswers')}>
                    Right answers
                  </th>
                  <th onClick={() => sortByAmount('wrongAnswers')}>
                    Wrong answers
                  </th>
                  <th onClick={() => sortByAmount('percent')}>Percentage</th>
                  <th className={s.th}>Delete</th>
                  <th>New Test</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(
                  ({
                    _id,
                    testId,
                    createAt,
                    topic,
                    rightAnswers,
                    wrongAnswers,
                    percent,
                  }) => {
                    return (
                      <tr
                        key={_id}
                        style={{
                          backgroundColor:
                            topic === 'Testing theory' ? '#C13C37' : '#E38627',
                        }}
                      >
                        <td>{new Date(createAt).toLocaleString()}</td>
                        <td>{topic}</td>
                        <td>{rightAnswers}</td>
                        <td>{wrongAnswers}</td>
                        <td>{percent} %</td>
                        <td onClick={handleClick} className={s.delete} id={_id}>
                          <FaTrashAlt />
                        </td>
                        <td id={testId} onClick={handleOpenModal} data-topic={[topic]}>
                          <Link className={s.linkQ} data-topic={[topic]}>
                            &#10226;
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
              {isOpenModal && (
           <ModalTestConfirm
             titleTest={nameTest}
             onClickYes={handleClickYes}
             onClickNo={handleClickNo}
             onCloseModal={onCloseModal}
           />
         )}
          </div>
          <div className={s.userContainer}>
            <div className={s.UserChart}>
              <p className={s.text}>
                {Math.round(totalProcent / data.length)}%
              </p>
              <UserChart data={data} />
            </div>

            <div className={s.mult}>
              <img
                src="https://i.postimg.cc/fR4S3p53/mult2.gif"
                border="0"
                alt="mult2"
              />
            </div>
          </div>
        </Container>
        
      ) : (
        <div className={s.multNull}>
          <img
            src="https://i.postimg.cc/NFsqCbbH/mult.gif"
            border="0"
            alt="mult"
          />
        </div>
      )}
    </div>
  );
}
