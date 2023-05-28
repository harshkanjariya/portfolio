import styles from './Terminal.module.scss';
import Typewriter from "typing-animation-react";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {TypewriterHandlers} from "typing-animation-react/stories/Typewriter/Typewriter";
import {useCli} from "../../utils/cli";

const message = 'Welcome to cli interface of portfolio!';

function Terminal() {
  const {
    stdout,
    getCurrentPrompt,
    execute,
    setStdout,
    getCommandSuggestions,
  } = useCli();
  const writer = useRef<TypewriterHandlers>({} as TypewriterHandlers);
  const [isAnimEnded, setIsAnimEnded] = useState(false);
  const stdin = useRef<HTMLInputElement>({} as any);

  useLayoutEffect(() => {
    if (writer.current)
      writer.current.write(message);
  }, []);

  useLayoutEffect(() => {
    if (isAnimEnded) {
      stdin.current.focus();
    }
  }, [isAnimEnded]);

  const Stdin = <input
    ref={stdin}
    className={styles.stdin}
    type="text"
    onKeyDown={(e) => {
      if (e.key == 'Enter') {
        execute(e.currentTarget.value);
        e.currentTarget.value = '';
      }
      if (e.key == 'Tab') {
        e.preventDefault();
        const {startIndex, suggestions} = getCommandSuggestions(e.currentTarget.value);
        if (suggestions.length == 1) {
          e.currentTarget.value += suggestions[0].substring(startIndex);
        }
      } else {
        console.log('Terminal.tsx > 34', e.key);
      }
    }}
    aria-multiline={false}
  />;
  let PathToShow: any = <div>
    <span dangerouslySetInnerHTML={{__html: getCurrentPrompt()}}/>
    &nbsp;{Stdin}
  </div>;

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
    <div className={styles.terminalBody}>
      <span className={styles.promptRow}>
        {PathToShow}
      </span>
      {stdout.map((o, i) => <div key={i} dangerouslySetInnerHTML={{__html: o}}/>)}
    </div>
  </div>
}

export default Terminal;