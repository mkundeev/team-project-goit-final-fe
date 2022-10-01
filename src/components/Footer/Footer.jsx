import React from 'react';
import { Link } from 'react-router-dom';
import images from '../../images/ukr.jpg';
import s from './Footer.module.css';
import Container from '../Container/Container';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.footerWrap}>
          <span className={s.text}>2022</span>
          <span className={s.footerText}>All Rights Reserved</span>
          <span className={s.footerText}> Developed with</span>
          <img className={s.footer_logo} src={images} alt="ukraine" />
          <span>
            by
            <Link to="/contacts" className={s.link}>
              GoIT Students
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}

// export default Footer;
