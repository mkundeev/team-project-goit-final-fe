import React from "react";
import { Link } from "react-router-dom";

import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footerWrap}>
      {/* <div className={s.container}> */}
      <span className={s.text}>2021</span>
      <p>All Rights Reserved</p>
      <p> Developed with</p>
      <img className={s.footer_logo} src="#" alt="ukraine" />
      <span>
        by
        <Link to="/contacts" className={s.link}>
          GoIT Students
        </Link>
      </span>
      {/* </div> */}
    </footer>
  );
}
