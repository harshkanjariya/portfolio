import styles from './Terminal.module.scss';
import Typewriter from "typing-animation-react";
import {useLayoutEffect, useRef, useState} from "react";
import {TypewriterHandlers} from "typing-animation-react/stories/Typewriter/Typewriter";
import {useCli} from "../../utils/cli";

const message = 'Welcome to cli interface of portfolio!';

function Terminal() {
  const {
    stdout,
    getCurrentPrompt,
    execute,
    setStdout,
  } = useCli();
  const writer = useRef<TypewriterHandlers>({} as TypewriterHandlers);
  const [isAnimEnded, setIsAnimEnded] = useState(false);
  const stdin = useRef<HTMLInputElement>({} as any);

  useLayoutEffect(() => {
    if (writer.current)
      writer.current.write(message);
  }, []);

  const Stdin = <input
    ref={stdin}
    className={styles.stdin}
    type="text"
    onKeyDown={(e) => {
      if (e.key == 'Enter') {
        execute(e.currentTarget.value);
        e.currentTarget.value = '';
      }
    }}
    aria-multiline={false}
  />;
  let PathToShow: any = <>{getCurrentPrompt()}&nbsp;{Stdin}</>;

  let FirstMessage;
  if (!isAnimEnded) {
    PathToShow = null;
    FirstMessage = <Typewriter
      style={{display: 'inline-block'}}
      delay={50}
      ref={writer}
      onAnimationEnd={() => setTimeout(() => {
        setIsAnimEnded(true);
        setStdout([message]);
      }, 500)}/>
  } else {
    FirstMessage = null;
  }

  return <div
    className={'page-body ' + styles.terminal}
    onClick={() => stdin.current.focus && stdin.current?.focus()}
  >
    {FirstMessage}
    {stdout.map((o, i) => <div key={i} dangerouslySetInnerHTML={{__html: o}} />)}
    <span className={styles.promptRow}>
      {PathToShow}
    </span>
  </div>
}

export default Terminal;