import {useTheme} from "../../core/ThemeProvider";
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {TypewriterHandlers} from "typing-animation-react/stories/Typewriter/Typewriter";
import {addEnterCallback, removeEnterCallback} from "../../utils/keyboardEvents";
import Typewriter from "typing-animation-react";
import {themes} from "../../utils/constants";

const messageList = [
  'Hello!',
  'I\'m Harsh Kanjariya',
  'Welcome to my portfolio',
];

function InitialTyping(props: any) {
  const {currentTheme} = useTheme();
  const [messageIndex, setMessageIndex] = useState(0);
  const [animEndTime, setAnimEndTime] = useState(-1);
  const typewriter = useRef<TypewriterHandlers>({} as any);

  useLayoutEffect(() => {
    typewriter.current.write(messageList[0]);
  }, []);

  const onEnter = useCallback(() => {
    if (Date.now() - animEndTime > 500) {
      if (messageList.length - 1 == messageIndex) {
        props.onEnd();
      } else {
        const deleteLength = messageList[messageIndex].length;
        const nextMessage = messageList[messageIndex + 1];
        typewriter.current.deleteChars(deleteLength);
        typewriter.current.write(nextMessage);
        setMessageIndex(messageIndex + 1);
        setAnimEndTime(-1);
      }
    }
  }, [typewriter.current, messageIndex, animEndTime]);

  useEffect(() => {
    addEnterCallback(onEnter);
    return () => {
      removeEnterCallback(onEnter);
    }
  }, [onEnter]);

  return <div className={props.className}>
    <Typewriter
      style={{
        fontSize: '30px',
        maxWidth: 500,
        textAlign: 'center',
      }}
      cursorWidth={3}
      cursorColor={currentTheme == themes.dark ? 'white' : 'black'}
      ref={typewriter}
      delay={50}
      onAnimationEnd={() => setAnimEndTime(Date.now())}
    />
  </div>
}

export default InitialTyping;