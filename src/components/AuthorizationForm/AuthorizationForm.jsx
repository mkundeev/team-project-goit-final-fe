import React from 'react'
import s from "./auth-form.module.css"
import { useState } from 'react'
import icon from '../../images/AuthForm/google-icon.svg'
import { useAuthorizeUserMutation } from 'app/testsApi';
import { setUser } from 'app/reducer'
import { useDispatch } from 'react-redux';

export default function AuthorizationForm() {
  const dispatch = useDispatch();
  const [authorizeUser] = useAuthorizeUserMutation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const {email, password} = form

  const onInput = (e) => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      }
    })
  }

  const logInUser = () => {
    authorizeUser({ password, form })
      .unwrap()
      .then(data => {
        dispatch(setUser(data));
        console.log(data);
      });
  };

  
  return (
    <div>
      <form className={s.form}>
        <p className={s.text}>You can use your Google Account to authorize:</p>
        <div className={s.link}>
          <img className={s.googleIcon} src={icon} alt=""/>
          <span className={s.googleTxt}>Google</span>
        </div>
        <p className={s.text}>Or login to our app using e-mail and password:</p>
        <div className={s.inputBlock}>
          <input onChange={onInput} id="email" value={email} className={s.input} type="text" placeholder="E-mail" />
          <input onChange={onInput} id="password" value={password} className={s.input} type="text" placeholder="Password" />
        </div>
        <div>
          <button onClick={logInUser} className={s.btn}>Sign in</button>
          <button className={s.btn}>Sign up</button>
        </div>
      </form>
    </div>
  )
}
