import React from 'react';
import s from './header.module.css'
import logo from '../../images/header/logo.svg'
import icon from '../../images/header/sign-out.svg'
import Container from 'components/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from 'app/reducer';
import { useLogOutUserMutation } from 'app/testsApi';

export default function Header() {
  const [logOut] = useLogOutUserMutation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    logOut()
      .unwrap()
      .then(() => dispatch(resetUser()));
  };
 

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapper}>
          <img src={logo} className={s.logo} alt="" />
          <div className={s.navBlock}>
            <nav className={s.nav}>
              <ul className={s.navList}>
                <li className={s.navListItem}>
                  <NavLink
                    to="home"
                    className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}
                  >
                    Home
                  </NavLink>
                </li>
                <li className={s.navListItem}>
                  <NavLink to="material" className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}>
                    Materials
                  </NavLink>
                </li>
                <li className={s.navListItem}>
                  <NavLink to="contacts" className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}>
                    Contacts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className={s.userPanel}>
              <span className={s.userIcon}>D</span>
              <span className={s.user}>Dmytrii</span>
              <span className={s.signOutBtn} onClick={handleLogOut}>
                <img className={s.signOutIcon} src={icon} alt="" />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>

  );
}
