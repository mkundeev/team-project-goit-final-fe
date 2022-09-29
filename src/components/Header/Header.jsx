import React from 'react';
import s from './header.module.css';
import Container from 'components/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetUser } from 'app/reducer';
import { useLogOutUserMutation } from 'app/testsApi';
import { useSelector } from 'react-redux';
import { getEmail, getToken } from 'app/selectors';
import { useState } from 'react';
import { useEffect } from 'react';
import MobileMenu from 'components/MobileMenu';
import Theme from 'components/Theme';
import { testsApi } from 'app/testsApi';
import { store } from 'app/store';

export default function Header() {
  const userEmail = useSelector(getEmail);
  const token = useSelector(getToken);
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
      .then(() => {
        dispatch(resetUser());
        store.dispatch(testsApi.util.resetApiState());
      })
      .then(() => setMenu(false));
  };

  const toggleMenu = e => {
    if (e.currentTarget.id === 'userLink') {
      setMenu(false);
    } else {
      setMenu(!isMenuOpen);
    }
  };

  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerWrapper}>
          <div className={s.logoWrapper}>
            <svg
              className={s.logoIcon}
              width="129"
              height="28"
              viewBox="0 0 129 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7785_35)">
                <path d="M129 0H0V28H129V0Z" className={s.strokeLine} />
                <path
                  className={s.blackFillColor}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M60.911 22.3H65.518V20.224H63.563V8.45999H65.518V6.38599H60.911V22.3ZM70.482 19H73.236V9.34399H77.044V7.09999H66.674V9.34399H70.482V19ZM86.87 14.461C86.8893 13.5848 86.6753 12.7193 86.25 11.953C85.8505 11.2496 85.2573 10.6758 84.541 10.3C83.7767 9.91565 82.9323 9.71765 82.0769 9.72217C81.2214 9.72668 80.3792 9.9336 79.619 10.326C78.8923 10.7121 78.2863 11.2914 77.868 12C77.439 12.7342 77.2184 13.5716 77.23 14.422C77.2159 15.2765 77.4396 16.1182 77.876 16.853C78.3154 17.575 78.9526 18.1559 79.712 18.527C80.5638 18.9413 81.502 19.147 82.449 19.127C83.1483 19.1747 83.8494 19.0668 84.502 18.8111C85.1546 18.5553 85.7423 18.1581 86.223 17.648L84.812 16.118C84.5181 16.409 84.1684 16.6375 83.784 16.79C83.3783 16.938 82.9488 17.0099 82.517 17.002C81.9015 17.0242 81.2947 16.8517 80.783 16.509C80.326 16.1922 80.0093 15.711 79.899 15.166H86.818C86.852 14.724 86.869 14.486 86.869 14.452L86.87 14.461ZM82.127 11.724C82.6735 11.7074 83.2071 11.8917 83.627 12.242C84.0393 12.5955 84.3058 13.0893 84.375 13.628H79.866C79.9311 13.0858 80.1982 12.588 80.614 12.234C81.0406 11.8875 81.5777 11.7064 82.127 11.724ZM92.227 19.136C93.0159 19.153 93.8016 19.0291 94.547 18.77C95.1298 18.5745 95.6453 18.2181 96.034 17.742C96.3706 17.3101 96.5505 16.7766 96.544 16.229C96.5779 15.659 96.389 15.0982 96.017 14.665C95.6803 14.3004 95.2516 14.0334 94.776 13.892C94.1725 13.7221 93.5594 13.5885 92.94 13.492C92.4438 13.4296 91.9543 13.3215 91.478 13.169C91.3449 13.1356 91.2271 13.0581 91.1438 12.9491C91.0604 12.8401 91.0164 12.7061 91.019 12.569C91.025 12.4373 91.0681 12.31 91.1433 12.2017C91.2185 12.0935 91.3227 12.0086 91.444 11.957C91.8431 11.7745 92.2809 11.6928 92.719 11.719C93.6417 11.7115 94.5502 11.9459 95.354 12.399L96.238 10.512C95.7421 10.2343 95.2055 10.0365 94.648 9.92599C94.0143 9.78492 93.3672 9.7135 92.718 9.71299C91.945 9.69615 91.1757 9.82296 90.449 10.087C89.8725 10.2898 89.3655 10.6522 88.987 11.132C88.6543 11.5754 88.4784 12.1167 88.487 12.671C88.4482 13.2539 88.6404 13.8287 89.022 14.271C89.368 14.6383 89.8046 14.908 90.288 15.053C90.8958 15.2263 91.515 15.357 92.141 15.444C92.6202 15.4902 93.0932 15.5871 93.552 15.733C93.68 15.7621 93.7947 15.8331 93.8778 15.9347C93.9609 16.0363 94.0078 16.1627 94.011 16.294C94.011 16.8493 93.45 17.127 92.328 17.127C91.7527 17.1243 91.1805 17.0415 90.628 16.881C90.1066 16.7413 89.6084 16.5264 89.149 16.243L88.265 18.143C88.8009 18.473 89.3869 18.7138 90 18.856C90.7275 19.0435 91.4758 19.1379 92.227 19.137V19.136ZM103.872 16.688C103.564 16.9194 103.186 17.0393 102.801 17.028C102.646 17.0379 102.492 17.015 102.346 16.9609C102.201 16.9068 102.069 16.8226 101.959 16.714C101.746 16.4668 101.639 16.1464 101.659 15.821V12.1H103.937V10.06H101.66V7.83099H99.008V10.058H97.6V12.1H99.011V15.857C98.9792 16.3038 99.0419 16.7523 99.1951 17.1733C99.3483 17.5942 99.5885 17.9781 99.9 18.3C100.603 18.8932 101.507 19.1917 102.425 19.133C102.829 19.1348 103.233 19.086 103.625 18.988C103.97 18.9076 104.297 18.7605 104.586 18.555L103.872 16.688ZM105.826 20.53H114.326V19H105.826V20.53ZM120.24 22.3V6.38599H115.65V8.45999H117.588V20.224H115.65V22.3H120.24Z"
                />
                <path
                  className={s.blackFillColor}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0H46.281L53.995 14.56L46.281 28H0V0Z"
                />
                <path
                  className={s.whiteFillColor}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.062 7.10002H10.911V19H13.665V15.719H16.065C17.0066 15.7413 17.9422 15.5648 18.811 15.201C19.5432 14.8895 20.166 14.3669 20.6 13.7C21.0284 13.0158 21.2471 12.2211 21.229 11.414C21.2487 10.6052 21.03 9.80841 20.6 9.12302C20.1614 8.45888 19.5381 7.93748 18.807 7.62302C17.9397 7.25518 17.0038 7.07687 16.062 7.10002ZM15.909 13.475H13.665V9.34402H15.909C16.5826 9.29653 17.2515 9.48614 17.8 9.88002C18.0185 10.0696 18.1904 10.307 18.3024 10.5737C18.4144 10.8404 18.4636 11.1293 18.446 11.418C18.4626 11.7043 18.4129 11.9906 18.3009 12.2545C18.1888 12.5185 18.0174 12.7531 17.8 12.94C17.2525 13.3326 16.5851 13.5219 15.913 13.475H15.909ZM26.041 11.061V9.85402H23.508V19H26.16V14.682C26.1334 14.3362 26.177 13.9887 26.288 13.6601C26.399 13.3316 26.5752 13.0288 26.806 12.77C27.0456 12.5495 27.3271 12.3795 27.6338 12.2699C27.9404 12.1603 28.2659 12.1134 28.591 12.132C28.693 12.132 28.8913 12.1434 29.186 12.166V9.71802C28.5492 9.70581 27.9164 9.82142 27.325 10.058C26.812 10.2645 26.3675 10.611 26.042 11.058L26.041 11.061ZM35.541 19.136C36.4387 19.1526 37.3265 18.9464 38.125 18.536C38.8632 18.1536 39.4811 17.5742 39.91 16.862C40.3463 16.1272 40.57 15.2855 40.556 14.431C40.5708 13.5768 40.3482 12.7352 39.913 12C39.4841 11.2878 38.8662 10.7084 38.128 10.326C37.323 9.9291 36.4375 9.72265 35.54 9.72265C34.6425 9.72265 33.757 9.9291 32.952 10.326C32.2101 10.7065 31.5888 11.2861 31.158 12C30.7216 12.7349 30.498 13.5765 30.512 14.431C30.4979 15.2856 30.7216 16.1272 31.158 16.862C31.5888 17.5759 32.21 18.1556 32.952 18.536C33.7536 18.9458 34.6438 19.1519 35.544 19.136H35.541ZM35.541 16.96C35.2279 16.9695 34.9162 16.913 34.6263 16.7943C34.3364 16.6757 34.0746 16.4974 33.858 16.271C33.6312 16.0227 33.4559 15.7318 33.3421 15.4153C33.2283 15.0988 33.1783 14.7629 33.195 14.427C33.1783 14.0911 33.2283 13.7552 33.3421 13.4387C33.4559 13.1222 33.6312 12.8314 33.858 12.583C34.0747 12.3569 34.3365 12.1788 34.6264 12.0602C34.9163 11.9417 35.2279 11.8854 35.541 11.895C35.853 11.8849 36.1635 11.9409 36.4522 12.0595C36.7409 12.1781 37.0013 12.3565 37.216 12.583C37.6691 13.0875 37.9042 13.7508 37.87 14.428C37.9042 15.1053 37.6691 15.7685 37.216 16.273C37.0013 16.4997 36.7411 16.6783 36.4524 16.7971C36.1636 16.9158 35.853 16.9721 35.541 16.962V16.96Z"
                />
              </g>
              <defs>
                <clipPath id="clip0_7785_35">
                  <rect width="129" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <Theme />
          </div>

          <div className={s.navBlock}>
            <nav className={s.nav}>
              <ul className={s.navList}>
                {token && (
                  <>
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
                  </>
                )}
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

            {userEmail && (
              <div className={s.userPanel}>
                <NavLink
                  id="userLink"
                  to="/user"
                  className={s.userLink}
                  onClick={toggleMenu}
                >
                  <span className={s.userIcon}>
                    {userEmail[0].toUpperCase()}
                  </span>
                  <span className={s.user}>{userEmail.split('@')[0]}</span>
                </NavLink>
                <span className={s.signOutBtn} onClick={handleLogOut}>
                  <svg
                    className={s.blackFillColor}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fillRule="none"
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
                </span>
              </div>
            )}

            <span onClick={toggleMenu} className={s.mobMenuBtn}>
              {!isMenuOpen && (
                <svg
                  className={s.blackFillColor}
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.5 10H15.5V8.33333H0.5V10ZM0.5 5.83333H15.5V4.16667H0.5V5.83333ZM0.5 0V1.66667H15.5V0H0.5Z" />
                </svg>
              )}
              {isMenuOpen && (
                <svg
                  className={s.blackFillColor}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.5832 1.94417L14.0557 0.416672L7.99984 6.47251L1.944 0.416672L0.416504 1.94417L6.47234 8.00001L0.416504 14.0558L1.944 15.5833L7.99984 9.52751L14.0557 15.5833L15.5832 14.0558L9.52733 8.00001L15.5832 1.94417Z" />
                </svg>
              )}
            </span>
          </div>
        </div>
      </Container>
      {isMenuOpen && (
        <MobileMenu
          token={token}
          toggleMenu={toggleMenu}
          handleLogOut={handleLogOut}
        />
      )}
    </header>
  );
}
