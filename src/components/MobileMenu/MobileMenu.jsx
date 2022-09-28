import s from './mobile-menu.module.css';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';

const modalRoot = document.querySelector('#modalRoot');

export default function MobileMenu({ handleLogOut, toggleMenu, token }) {
  return createPortal(
    <div className={s.menu}>
      <nav className={s.nav}>
        <ul className={s.navList}>
          {token && (
            <>
              <li className={s.navListItem}>
                <NavLink
                  onClick={toggleMenu}
                  to="home"
                  className={({ isActive }) =>
                    isActive ? s.activeLink : s.navLink
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={s.navListItem}>
                <NavLink
                  onClick={toggleMenu}
                  to="material"
                  className={({ isActive }) =>
                    isActive ? s.activeLink : s.navLink
                  }
                >
                  Materials
                </NavLink>
              </li>
            </>
          )}
          <li className={s.navListItem}>
            <NavLink
              onClick={toggleMenu}
              to="contacts"
              className={({ isActive }) =>
                isActive ? s.activeLink : s.navLink
              }
            >
              Contacts
            </NavLink>
          </li>
        </ul>
      </nav>
     {token && <span className={s.signOutBtn} onClick={handleLogOut}>
        <svg
          className={s.signOutIcon}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7785_16)">
            <path d="M12.6465 4.64645L11.9395 5.35348L14.086 7.49997H7V8.49998H14.086L11.9395 10.6465L12.6465 11.3535L16 7.99997L12.6465 4.64645Z" />
            <path d="M11 15H1.00001V1.00001H11V2.00002H12V0.500005C12 0.223628 11.7764 0 11.5 0H0.500005C0.223628 0 0 0.223628 0 0.500005V15.5C0 15.7764 0.223628 16 0.500005 16H11.5C11.7764 16 12 15.7764 12 15.5V14H11V15Z" />
          </g>
          <defs>
            <clipPath id="clip0_7785_16">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>}
    </div>,
    modalRoot
  );
}
