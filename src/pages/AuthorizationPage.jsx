import React from 'react';
import { useDispatch } from 'react-redux';
import Container from 'components/Container';
import { useAuthorizeUserMutation } from 'app/testsApi';
import { setUser } from 'app/reducer';

export default function AuthorizationPage() {
  const [authorizeUser] = useAuthorizeUserMutation();
  const dispatch = useDispatch();

  const logInUser = () => {
    authorizeUser({ password: '12345678', email: 'test@test.com' })
      .unwrap()
      .then(data => {
        dispatch(setUser(data));
        console.log(data);
      });
  };

  return (
    <Container>
      <button type="button" onClick={logInUser}>
        Sign In
      </button>
    </Container>
  );
}
