import React, {useState} from 'react';
import styles from './Contact.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {addContact} from '../../api/public';

function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  async function submit() {
    try {
      const response = await addContact({
        name,
        contact,
        message,
      });
      console.log('Contact.tsx > 18', response);
      // setMessage('');
      // setName('');
      // setContact('');
    } catch (e) {
      console.log('Contact.tsx > 24', e);
    }
  }

  return <div className={'page-body ' + styles.contactPage}>
    <div className={'card ' + styles.centerDiv}>
      <div className={styles.header}>
        <a href={'https://wa.me/+917802004735'} target={'_blank'} rel="noreferrer">
          <img src="/icons/whatsapp.png" alt="whatsapp"/>
          &nbsp;+91 7802004735
        </a>
        <a href={'https://mail.google.com/mail/?view=cm&to=code.harshkanjariya@gmail.com'} target={'_blank'}
           rel="noreferrer">
          <img src="/icons/email.png" alt="email"/>
          &nbsp;code.harshkanjariya@gmail.com
        </a>
      </div>
      <div className={styles.separator}><span>OR</span></div>
      <h3>Drop me a message</h3>
      <div className={'flex-col ' + styles.form}>
        <Input
          className={styles.input}
          hint={'Name'}
          onChange={(v) => setName(v)}
        />
        <Input
          className={styles.input}
          hint={'Email or phone'}
          onChange={(v) => setContact(v)}
        />
        <textarea
          className={styles.textarea}
          cols={30}
          rows={10}
          placeholder={'Message'}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
      </div>
      <div className={styles.footer}>
        <Button text={'Submit'} onClick={submit}/>
      </div>
    </div>
  </div>;
}

export default Contact;