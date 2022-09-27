import s from './User.module.css';

export default function MobileCartREsult({
  wrongAnswers,
  rightAnswers,
  topic,
  percent,
}) {
  return (
    <div className={s.Cart}>
      <h2>{topic}</h2>
      <ul>
        <li
          style={{
            backgroundColor: topic === 'Testing theory' ? '#C13C37' : '#E38627',
          }}
        >
          Right answers: {rightAnswers}
        </li>
        <li
          style={{
            backgroundColor: topic === 'Testing theory' ? '#C13C37' : '#E38627',
          }}
        >
          Wrong answers: {wrongAnswers}
        </li>
        <li
          style={{
            backgroundColor: topic === 'Testing theory' ? '#C13C37' : '#E38627',
          }}
        >
          Percentage: {percent} %
        </li>
      </ul>
    </div>
  );
}
