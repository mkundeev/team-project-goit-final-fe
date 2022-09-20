import React from "react";
import { Link } from "react-router-dom";

import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footerWrap}>
        <span className={s.text}>2022</span>
        <p className={s.footerText}>All Rights Reserved</p>
        <p className={s.footerText}> Developed with</p>
        <img
          className={s.footer_logo}
          src="../../images/ukr.jpg"
          alt="ukraine"
        />
        <span>
          by
          <Link to="/contacts" className={s.link}>
            GoIT Students
          </Link>
        </span>
      </div>
    </footer>
  );
}
