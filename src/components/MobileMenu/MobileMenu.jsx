import s from './mobile-menu.module.css'
import icon from '../../images/header/sign-out.svg'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom';


const modalRoot = document.querySelector('#modalRoot');

export default function MobileMenu({handleLogOut, toggleMenu}) {
    return createPortal(
        <div className={s.menu}>
            <nav className={s.nav}>
                <ul className={s.navList}>
                    <li className={s.navListItem}>
                        <NavLink onClick={toggleMenu}
                            to="home"
                            className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className={s.navListItem}>
                        <NavLink onClick={toggleMenu} to="material" className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}>
                            Materials
                        </NavLink>
                    </li>
                    <li className={s.navListItem}>
                        <NavLink onClick={toggleMenu} to="contacts" className={({ isActive }) => (isActive ? s.activeLink : s.navLink)}>
                            Contacts
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <span className={s.signOutBtn} onClick={handleLogOut}>
                <img className={s.signOutIcon} src={icon} alt="" />
            </span>
        </div>,
        modalRoot
    )
}