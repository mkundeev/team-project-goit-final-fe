import React from 'react';
import s from './User.module.css';
import Container from 'components/Container';
import UserChart from './UserChart';

export default function User({ data }) {
  console.log(data);
  //   const { data } = useGetTestListQuery();
  //   const [tests, setTests] = useState('');

  //   useEffect(() => setTests(data), [data]);
  //   const dataUser = [
  //     {
  //       id: testId,
  //       data: createTest,
  //       title: topic,
  //       rightAnswers,
  //       wrongAnswers,
  //       resultProcent,
  //     },
  //   ];
  // const data = [
  //   {
  //     id: 1,
  //     data: ' 12.06.2022',
  //     title: 'User Test',
  //     rightAnswers: 10,
  //     wrongAnswers: 2,
  //     resultProcent: '86%',
  //   },
  //   {
  //     id: 2,
  //     data: ' 12.06.2022',
  //     title: 'User Test',
  //     rightAnswers: 10,
  //     wrongAnswers: 2,
  //     resultProcent: '100%',
  //   },
  //   {
  //     id: 3,
  //     data: ' 12.06.2022',
  //     title: 'User Test',
  //     rightAnswers: 10,
  //     wrongAnswers: 2,
  //     resultProcent: '50%',
  //   },
  // ];
  const key = data.map(el => Object.keys(el));
  // const numProcent = data.map(el => {
  //   if (el.resultProcent.split('').length === 4) {
  //     return el.resultProcent.split('').splice(0, 3).join('');
  //   }
  //   return el.resultProcent.split('').splice(0, 2).join('');
  // });

  const totalProcent = data.reduce((acc, el) => acc + Number(el.percent), 0);

  console.log(totalProcent);
  return (
    <div className={s.user}>
      {
        <Container>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Topic</th>
                <th>Right answers</th>
                <th>Wrong answers</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                ({
                  _id,
                  createAt,
                  topic,
                  rightAnswers,
                  wrongAnswers,
                  percent,
                }) => {
                  return (
                    <tr key={_id}>
                      <td>{createAt}</td>
                      <td>{topic}</td>
                      <td>{rightAnswers}</td>
                      <td>{wrongAnswers}</td>
                      <td>{percent} %</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div className={s.userContainer}>
            <div className={s.UserChart}>
              <p className={s.text}>
                {Math.round(totalProcent / data.length)}%
              </p>
              <UserChart />
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
      }
    </div>
  );
}
