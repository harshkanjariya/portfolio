import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header/Header";
import {addEnterCallback, removeEnterCallback} from "../utils/keyboardEvents";
import Typewriter from 'typing-animation-react';
import {TypewriterHandlers} from "typing-animation-react/stories/Typewriter/Typewriter";
import styles from './Welcome.module.scss';
import {useTheme} from "../core/ThemeProvider";
import {themes} from "../utils/constants";

const messageList = [
  'Hello!',
  'I\'m Harsh Kanjariya',
  'Welcome to my portfolio',
];

function Welcome() {
  const {currentTheme} = useTheme();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyped, setIsTyped] = useState(false);
  const typewriter = useRef<TypewriterHandlers>({} as any);

  useEffect(() => {
    typewriter.current.write(messageList[messageIndex]);
  }, [messageIndex]);

  function onEnter() {
    if (isTyped) {
      typewriter.current.deleteChars(messageList[messageIndex].length);
      setMessageIndex(
        messageIndex == messageList.length - 1 ?
          0 :
          messageIndex + 1
      );
    }
  }

  useEffect(() => {
    addEnterCallback(onEnter);
    return () => {
      removeEnterCallback(onEnter);
    }
  }, [onEnter]);

  return <>
    <Header/>
    <div className={'page-body ' + styles.welcomePage}>
      <div className={styles.writingAnimationText}>
        <Typewriter
          style={{
            fontSize: '30px',
          }}
          cursorWidth={3}
          cursorColor={currentTheme == themes.dark ? 'white' : 'black'}
          ref={typewriter}
          delay={50}
          onAnimationEnd={() => {
            setIsTyped(true);
          }}
        />
      </div>
    </div>
  </>;
}

export default Welcome;