import Container from 'components/Container';
import { useState, useEffect } from 'react';
import s from './Home.module.css';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGetTestListQuery } from 'app/testsApi';

export default function HomePage() {
  const { data } = useGetTestListQuery();
  const [tests, setTests] = useState('');

  useEffect(() => setTests(data), [data]);

  return (
    <section className={s.homeMain}>
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
                  <Link to={`/test/${_id}`} className={s.link}>
                    <span className={s.spanText}>{topic}</span>
                  </Link>
                  <span className={s.span}>
                    <BsArrowRight className={s.svg} />
                  </span>
                </li>
              ))
              .reverse()}
          </ul>
        ) : (
          <></>
        )}
      </Container>
    </section>
  );
}
