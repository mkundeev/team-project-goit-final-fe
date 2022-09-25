import React from 'react';
import s from './auth-form.module.css';
import { useState, useEffect } from 'react';
import icon from '../../images/auth-form/google-icon.svg';
import { toast } from 'react-toastify';
import {
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useAuthorizeUserByGoogleMutation,
} from '../../app/testsApi';
import { setUser } from 'app/reducer';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';

const dirtyState = {
  emailDirty: false,
  passwordDirty: false,
};

const errorState = {
  emailError: 'This is a required field',
  passwordError: 'This is a required field',
};

export default function AuthorizationForm() {
  const dispatch = useDispatch();

  const [authorizeUser] = useAuthorizeUserMutation();
  const [registerUser] = useRegisterUserMutation();
  const [googleLogin] = useAuthorizeUserByGoogleMutation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // form validation state
  const [error, setError] = useState(errorState);
  const [dirty, setDirty] = useState(dirtyState);
  const [formValidity, setFormValidity] = useState('true');

  const { email, password } = form;
  const { emailError, passwordError } = error;
  const { emailDirty, passwordDirty } = dirty;

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValidity(false);
    } else {
      setFormValidity(true);
    }
  }, [emailError, passwordError]);

  const onInput = e => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });

    if (e.target.id === 'password') {
      if (e.target.value.length !== 0 && e.target.value.length < 8) {
        setError(prevState => {
          return {
            ...prevState,
            passwordError: 'Password must be not less than 8 symbols',
          };
        });
      } else if (!e.target.value) {
        setError(prevState => {
          return {
            ...prevState,
            passwordError: 'This is a required field',
          };
        });
      } else {
        setError(prevState => {
          return {
            ...prevState,
            passwordError: '',
          };
        });
      }
    }

    if (e.target.id === 'email') {
      const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

      if (e.target.value) {
        if (!pattern.test(String(e.target.value).toLowerCase())) {
          setError(prevState => {
            return {
              ...prevState,
              emailError: 'Incorrect email format',
            };
          });
        } else {
          setError(prevState => {
            return {
              ...prevState,
              emailError: '',
            };
          });
        }
      } else {
        setError(prevState => {
          return {
            ...prevState,
            emailError: 'This is a required field',
          };
        });
      }
    }
  };

  const onBlur = e => {
    switch (e.target.id) {
      case 'email':
        setDirty(prevState => {
          return {
            ...prevState,
            emailDirty: true,
          };
        });
        break;

      case 'password':
        setDirty(prevState => {
          return {
            ...prevState,
            passwordDirty: true,
          };
        });
        break;

      default:
        return;
    }
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
          <div className={s.inputWrapper}>
            <input
              onChange={onInput}
              onBlur={onBlur}
              id="email"
              value={email}
              className={s.input}
              type="text"
              placeholder="E-mail"
            />
            {emailDirty && emailError && (
              <p className={s.message}>{emailError}</p>
            )}
          </div>
          <input
            onChange={onInput}
            onBlur={onBlur}
            id="password"
            value={password}
            className={s.input}
            type="password"
            placeholder="Password"
          />
          {passwordDirty && passwordError && (
            <p className={s.message}>{passwordError}</p>
          )}
        </div>
        <div>
          <button onClick={logInUser} className={s.btn}  disabled={!formValidity}>
            Sign in
          </button>
          <button onClick={signUpUser} className={s.btn}  disabled={!formValidity}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
