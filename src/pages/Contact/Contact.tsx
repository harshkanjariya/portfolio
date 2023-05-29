import styles from './Contact.module.scss';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Contact() {
  return <div className={'page-body ' + styles.contactPage}>
    <div className={'card ' + styles.centerDiv}>
      <div className={styles.header}>
        <a href={'https://wa.me/+917802004735'} target={'_blank'}>
          <img src="/icons/whatsapp.png" alt="whatsapp"/>
          &nbsp;+91 7802004735
        </a>
        <a href={'https://mail.google.com/mail/?view=cm&to=code.harshkanjariya@gmail.com'} target={'_blank'}>
          <img src="/icons/email.png" alt="email"/>
          &nbsp;code.harshkanjariya@gmail.com
        </a>
      </div>
      <div className={styles.separator}><span>OR</span></div>
      <h3>Drop me a message</h3>
      <div className={'flex-col ' + styles.form}>
        <Input className={styles.input} hint={'Name'}/>
        <Input className={styles.input} hint={'Email or phone'}/>
        <textarea
          className={styles.textarea}
          cols={30}
          rows={10}
          placeholder={'Message'}
        />
      </div>
      <div className={styles.footer}>
        <Button text={'Submit'} onClick={() => {}} />
      </div>
    </div>
  </div>
}

export default Contact;