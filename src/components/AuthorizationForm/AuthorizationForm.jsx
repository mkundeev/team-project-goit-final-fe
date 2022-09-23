import React from 'react';
import s from './auth-form.module.css';
import { useState } from 'react';
import icon from '../../images/AuthForm/google-icon.svg';
import { toast } from 'react-toastify';
import {
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useAuthorizeUserByGoogleMutation,
} from '../../app/testsApi';
import { setUser } from 'app/reducer';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

export default function AuthorizationForm() {
  const dispatch = useDispatch();
  const [authorizeUser] = useAuthorizeUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const [googleLogin] = useAuthorizeUserByGoogleMutation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const onInput = e => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const logInUser = e => {
    e.preventDefault();
    authorizeUser(form)
      .unwrap()
      .then(data => {
        dispatch(setUser(data));
      })
      .catch(err =>
        toast.error(err.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      );
  };
  const signUpUser = e => {
    e.preventDefault();
    registerUser(form)
      .unwrap()
      .then(() =>
        authorizeUser(form)
          .unwrap()
          .then(data => {
            dispatch(setUser(data));
          })
      )
      .catch(({ data }) => {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log(code);
      googleLogin({ code })
        .unwrap()
        .then(data => {
          dispatch(setUser(data));
        })
        .catch(data => {
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
    flow: 'auth-code',
  });

  return (
    <div>
      <form className={s.form}>
        <p className={s.text}>You can use your Google Account to authorize:</p>
        <div className={s.link} onClick={login}>
          <img className={s.googleIcon} src={icon} alt="" />
          <span className={s.googleTxt}>Google</span>
        </div>
        <p className={s.text}>Or login to our app using e-mail and password:</p>
        <div className={s.inputBlock}>
          <input
            onChange={onInput}
            id="email"
            value={email}
            className={s.input}
            type="text"
            placeholder="E-mail"
          />
          <input
            onChange={onInput}
            id="password"
            value={password}
            className={s.input}
            type="text"
            placeholder="Password"
          />
        </div>
        <div>
          <button onClick={logInUser} className={s.btn}>
            Sign in
          </button>
          <button onClick={signUpUser} className={s.btn}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
