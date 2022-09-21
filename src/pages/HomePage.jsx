import Container from 'components/Container';
import React from 'react';
import s from './Home.module.css';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const qa = 'QA technical training';
  const testing = 'Testing theory';
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
        <ul className={s.list}>
          <li className={s.item}>
            {/* <button type="button" className={s.button }> */}
            <Link to={`/test?${qa}`} className={s.link}>
              <span className={s.spanText}> QA technical training</span>
            </Link>
            <span className={s.span}>
              <BsArrowRight className={s.svg} />
            </span>
            {/* </button> */}
          </li>
          <li className={s.item}>
            <Link to={`/test?${testing}`} className={s.link}>
              <span className={s.spanText}>
                Testing <br />
                theory
              </span>
              <span className={s.span}>
                <BsArrowRight className={s.svg} />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
