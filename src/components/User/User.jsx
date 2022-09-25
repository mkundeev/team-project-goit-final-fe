import React from 'react';
import s from './User.module.css';
import Container from 'components/Container';
import UserChart from './UserChart';

export default function User() {
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
  const data = [
    {
      id: 1,
      data: ' 12.06.2022',
      title: 'User Test',
      rightAnswers: 10,
      wrongAnswers: 2,
      resultProcent: '86%',
    },
    {
      id: 2,
      data: ' 12.06.2022',
      title: 'User Test',
      rightAnswers: 10,
      wrongAnswers: 2,
      resultProcent: '100%',
    },
    {
      id: 3,
      data: ' 12.06.2022',
      title: 'User Test',
      rightAnswers: 10,
      wrongAnswers: 2,
      resultProcent: '50%',
    },
  ];
  const key = data.map(el => Object.keys(el));
  const numProcent = data.map(el => {
    if (el.resultProcent.split('').length === 4) {
      return el.resultProcent.split('').splice(0, 3).join('');
    }
    return el.resultProcent.split('').splice(0, 2).join('');
  });

  console.log(numProcent);
  const totalProcent = numProcent.reduce((acc, el) => acc + Number(el), 0);

  console.log(totalProcent);
  return (
    <div className={s.user}>
      {
        <Container>
          <table>
            <tr>
              {key[0].slice(1).map(el => {
                return <th key={el.id}>{el}</th>;
              })}
            </tr>

            {data.map(
              ({
                id,
                data,
                title,
                rightAnswers,
                wrongAnswers,
                resultProcent,
              }) => {
                return (
                  <tr key={id}>
                    <td>{data}</td>
                    <td>{title}</td>
                    <td>{rightAnswers}</td>
                    <td>{wrongAnswers}</td>
                    <td>{resultProcent}</td>
                  </tr>
                );
              }
            )}
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
