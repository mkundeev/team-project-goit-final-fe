import React from 'react';
import s from './auth-page.module.css'
import Container from 'components/Container';
import AuthorizationForm from 'components/AuthorizationForm';

export default function AuthorizationPage() {
  
  return (
    <section className={s.section}>
      <Container>
        <div className={s.authBlock}>
          <div className={s.textWrapper}>
            <h1 className={s.title}>Pro Test</h1>
            <p className={s.text}>
              <span className={s.word}>[</span> We will help you find weak points
              in knowledge so that you can strengthen it.
              We will show you what is relevant to know for a <span className={s.word}>QA Engineer</span> and will try to make the learning
              process more diverse_ <span className={s.word}>]</span>
            </p>
          </div>
          <div className={s.formWrapper}>
            <AuthorizationForm />
          </div>
        </div>

      </Container>
    </section>

  );
}
