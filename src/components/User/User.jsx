import { useState } from 'react';
import s from './User.module.css';
import Container from 'components/Container';
import UserChart from './UserChart';
import MobileCartREsult from './MobileCartResult';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

export default function User({ data }) {
  const [amountSort, setAmountSort] = useState({});
  const [topicSort, setTopicSort] = useState(true);
  const [dateSort, setDateSort] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
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
  
  const arr = (test,string) =>
  {
    data.map((el) =>
    {
      return el.topic === string ? test.push(el.topic, el.testId) : null;
    });
  }
  
  const handleClick = (e) =>
  {
    console.log(e.currentTarget.id);
  }
  
const QaTesting = [];
const testing = [];
arr(QaTesting,'QA technical training');
arr(testing,"Testing theory")
  
  const newQa = [ ...new Set(QaTesting) ];
  
  const newTest = [ ...new Set(testing) ];

  console.log(data);
  return (
    <div className={s.user}>
      {data.length ? (
        <Container>
          <ul className={s.list}>
            <li className={s.itemQ}>
              <button type='button' className={s.buttonQ}>
               <Link to={`/test/${newQa[1]}`} className={s.linkQ}>
                 {newQa[0]}
                </Link>
                </button>
            </li>
            <li className={s.itemT}>
              <button type='button' className={s.buttonT}>
               <Link to={`/test/${newTest[1]}`} className={s.linkT}>
                 {newTest[0]}
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
                </tr>
              </thead>
              <tbody>
                {filteredData.map(
                  ({
                    _id,
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
                        <td onClick={handleClick} className={s.delete} id={_id}><FaTrashAlt/></td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
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
        <div className={s.mult}>
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
