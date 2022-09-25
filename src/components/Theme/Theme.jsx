import React from 'react';
import { useLayoutEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import s from './Theme.module.css';

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return { theme, setTheme };
};
export default function Theme() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className={s.wrapperDayNight}>
        <a href="#" className={s.toggle}>
          <input
            className={s.toggleInput}
            type="checkbox"
            onChange={() => {
              if (theme === 'light') {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            }}
            checked={theme === 'dark'}
          />
          <div className={s.toggleBg}></div>
          <div className={s.toggleSwitch}>
            <img
              className={s.toggleSwitchFigure}
              src="https://i.postimg.cc/9MhHs8Qv/day.png"
              border="0"
              alt="day"
            />

            <div className={s.toggleSwitchFigureAlt}></div>
          </div>
        </a>
      </div>
    </>
  );
}
