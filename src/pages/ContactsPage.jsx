import { useState } from 'react';

import React from 'react';
import Container from '../components/Container/Container';
import s from '../components/Contacts/Contacts.module.css';
import Contacts from '../components/Contacts/Contacts';
import userContacts from '../components/Contacts/userContacts';

export default function ContactsPage() {
  const [card] = useState(userContacts);
  return (
    <Container>
      <main className={s.mainContacts}>
        <h2 className={s.title}>Our team</h2>
        <ul className={s.list}>
          {card.map(({ id, name, position, text, image, linkedin, github }) => (
            <Contacts
              key={id}
              name={name}
              position={position}
              text={text}
              image={image}
              linkedin={linkedin}
              github={github}
            />
          ))}
        </ul>
      </main>
    </Container>
  );
}
