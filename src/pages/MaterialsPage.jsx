import Container from 'components/Container';
import UserLiterature from 'components/UseInfo/UserLiterature';
import React from 'react';
import s from './Materrials.module.css';
import UserResources from 'components/UseInfo/UserResources';

export default function MaterialsPage()
{
  const arrLiterature = [ {
    text: "Testing dot.com Savin",
    number: 1
  },
  { text: "A mental hospital in the hands of patients.", number: 2 },
  { text: "Scrum. J. Sutherland.", number: 3 }
  ];

  const arrResources = [
    {text: " dou.ua",number: 1, href:"https://dou.ua/"},
  { text: "Habr", number: 2 ,href:"https://habr.com/ru/news/"},
    { text: "facebook.com/QA", number: 3 ,href:"https://www.facebook.com/goITclub"},
  { text: "goit.ua", number: 4 ,href:"https://goit.ua/?lang=uk"}
  ];


  return (
    <section className={s.materialsMain}>
    <Container>
        <UserLiterature title="Useful literature" array={arrLiterature} />
        <UserResources title="Useful resources" array={arrResources} />
    </Container>
    </section>);
}
