import React from 'react';
import s from './Chart.module.css';

export default function SimonCat({ data }) {
  const Simon =
    9 < data
      ? 'https://i.postimg.cc/05cfVXVy/good.gif'
      : 6 < data
      ? 'https://i.postimg.cc/MHjxsPh3/happy-cat.gif'
      : 3 < data
      ? 'https://i.postimg.cc/MGC8nbcy/no-bad-gif.gif'
      : 0 <= data
      ? 'https://i.postimg.cc/mk09qnhP/bad-png.gif'
      : null;
  const text = () => {
    switch (Simon) {
      case 'https://i.postimg.cc/05cfVXVy/good.gif':
        return 'Good Job!';
      case 'https://i.postimg.cc/MHjxsPh3/happy-cat.gif':
        return 'Keep it up!';
      case 'https://i.postimg.cc/MGC8nbcy/no-bad-gif.gif':
        return "Success doesn't come to you. You go to it!";
      case 'https://i.postimg.cc/mk09qnhP/bad-png.gif':
        return ' Success is 99% failure';

      default:
        break;
    }
  };

  return (
    <div className={s.cat}>
      <img src={Simon} border="0" alt="good" className={s.catImg} />
      <h2 className={s.catText}>{text()}</h2>
    </div>
  );
}
