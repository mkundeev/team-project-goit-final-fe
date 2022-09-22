import React from 'react';
import { store } from 'app/store';
import { testsApi } from 'app/testsApi';
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
      .then(() => {
        dispatch(resetUser());
        store.dispatch(testsApi.util.resetApiState());
      });
  };
  let activeStyle = {
    textDecoration: 'underline',
  };

  let activeClassName = 'underline';

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="home"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="material">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Material
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="contacts">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Contacts
              </span>
            )}
          </NavLink>
        </li>
      </ul>
      <button type="button" onClick={handleLogOut}>
        LogOut
      </button>
    </nav>
  );
}
