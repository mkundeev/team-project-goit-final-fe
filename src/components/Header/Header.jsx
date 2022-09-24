import React from 'react';
import s from './header.module.css';
import logo from '../../images/header/logo.svg';
import icon from '../../images/header/sign-out.svg';
import mobIcon from '../../images/header/burger-menu.svg';
import crossIcon from '../../images/header/cross-icon.svg';
import Container from 'components/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from 'app/reducer';
import { useLogOutUserMutation } from 'app/testsApi';
import { useSelector } from 'react-redux';
import { getEmail } from 'app/selectors';
import { useState } from 'react';
import { useEffect } from 'react';
import MobileMenu from 'components/MobileMenu';

export default function Header() {
  const userEmail = useSelector(getEmail);
  const [logOut] = useLogOutUserMutation();
  const dispatch = useDispatch();
  const [isMenuOpen, setMenu] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isMenuOpen]);

  const handleLogOut = () => {
    logOut()
      .unwrap()
      .then(() => dispatch(resetUser()));
  };

  const toggleMenu = () => {
    setMenu(!isMenuOpen);
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
                    className={({ isActive }) =>
                      isActive ? s.activeLink : s.navLink
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className={s.navListItem}>
                  <NavLink
                    to="material"
                    className={({ isActive }) =>
                      isActive ? s.activeLink : s.navLink
                    }
                  >
                    Materials
                  </NavLink>
                </li>
                <li className={s.navListItem}>
                  <NavLink
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
           
              <div className={s.userPanel}>
              {userEmail && ( <div>
                <span className={s.userIcon}>{userEmail[0].toUpperCase()}</span>
                <span className={s.user}>{userEmail.split('@')[0]}</span>
                <span className={s.signOutBtn} onClick={handleLogOut}>
                  <img className={s.signOutIcon} src={icon} alt="" />
                </span>
                </div>)}
              
                <span onClick={toggleMenu} className={s.mobMenuBtn}>
                  {!isMenuOpen && (
                    <img className={s.mobMenuIcon} src={mobIcon} alt="" />
                  )}
                  {isMenuOpen && (
                    <img className={s.crossIcon} src={crossIcon} alt="" />
                  )}
                </span>
              </div>
          
          </div>
        </div>
      </Container>
      {isMenuOpen && (
        <MobileMenu toggleMenu={toggleMenu} handleLogOut={handleLogOut} />
      )}
    </header>
  );
}
