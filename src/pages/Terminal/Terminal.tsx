import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from './Terminal.module.scss';
import Typewriter from 'typing-animation-react';
import {TypewriterHandlers} from 'typing-animation-react/stories/Typewriter/Typewriter';
import {useCli} from '../../utils/cli';
import {addKeyCallback, removeKeyCallback} from '../../utils/keyboardEvents';

const message = 'Welcome to cli interface of portfolio!';

function Terminal() {
  const {
    stdout,
    setStdout,
    links, openSelectedLink,
    selection, setSelection,
    getCurrentPrompt,
    execute,
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
    if (isAnimEnded && stdin.current) {
      stdin.current.focus();
    }
  }, [isAnimEnded]);

  const Stdin = <input
    ref={stdin}
    className={styles.stdin}
    type="text"
    onKeyDown={(e) => {
      if (e.key == 'Enter') {
        e.stopPropagation();
        execute(e.currentTarget.value);
        e.currentTarget.value = '';
      }
      if (e.key == 'Tab') {
        e.preventDefault();
        const {startIndex, suggestions} = getCommandSuggestions(e.currentTarget.value);
        if (suggestions.length == 1) {
          e.currentTarget.value += suggestions[0].substring(startIndex);
        }
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
      }, 500)}/>;
  } else {
    FirstMessage = null;
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key == 'ArrowDown') {
      setSelection((selection) =>
        Math.min(links.length - 1, selection + 1));
    } else if (e.key == 'ArrowUp') {
      setSelection((selection) =>
        Math.max(0, selection - 1));
    } else if (e.key == 'Enter' && links.length) {
      openSelectedLink();
    }
  }, [links.length, selection, setSelection]);

  useEffect(() => {
    addKeyCallback(onKeyDown);
    return () => {
      removeKeyCallback(onKeyDown);
    };
  }, [onKeyDown]);

  let Links;
  if (links.length) {
    Links = <table className={styles.linkContainer}>
      <tbody>
      {links.map((link: any, i: number) =>
        <tr key={i}>
          <td><input type="radio" readOnly={true} checked={i == selection}/></td>
          <td>{link.name}</td>
          <td>{link.value}</td>
        </tr>
      )}
      </tbody>
    </table>;
  }

  return <div
    className={'page-body ' + styles.terminal}
    onClick={() => stdin.current && stdin.current.focus && stdin.current?.focus()}
  >
    {FirstMessage}
    <div className={styles.terminalBody}>
      {Links || <span className={styles.promptRow}>
        {PathToShow}
      </span>}
      {stdout.map((o, i) => <div key={i} dangerouslySetInnerHTML={{__html: o}}/>)}
    </div>
  </div>;
}

export default Terminal;