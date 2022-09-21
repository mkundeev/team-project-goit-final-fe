import React from 'react';
import s from './Contacts.module.css';
import img from './img/symbol-defs.svg';

export default function Contacts({
  image,
  name,
  position,
  text,
  linkedin,
  github,
}) {
  return (
    <li className={s.teamItem}>
      <img src={image} alt="" />
      <div className={s.teamDesc}>
        <h3 className={s.teamName}>{name}</h3>
        <p lang="eng" className={s.teamProfession}>
          {position}
        </p>
        <p className={s.text}>{text}</p>
        <ul className={s.media}>
          <li className={s.mediaItem}>
            <a className={s.mediaLink} href={github} target="blank">
              <svg className={s.mediaIcon} alt="logo github">
                <use href={`${img}#icon-github`}></use>
              </svg>
            </a>
          </li>
          <li className={s.mediaItem}>
            <a className={s.mediaLink} href={linkedin} target="blank">
              <svg className={s.mediaIcon} alt="logo linkedin">
                <use href={`${img}#icon-linkedin`}></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
}
