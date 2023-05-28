import styles from './Terminal.module.scss';
import Typewriter from "typing-animation-react";
import {useLayoutEffect, useRef, useState} from "react";
import {TypewriterHandlers} from "typing-animation-react/stories/Typewriter/Typewriter";
import {Path} from "../FileExplorer/FileExplorer";

const fs = require('../../assets/data/fs.json');

function Terminal() {
  const writer = useRef<TypewriterHandlers>({} as TypewriterHandlers);
  const [isAnimEnded, setIsAnimEnded] = useState(false);
  const stdin = useRef<HTMLInputElement>({} as any);
  const [path, setPath] = useState<Path[]>([
    {value: 'education', label: 'Education'},
    {value: 'education', label: 'Experience'},
  ]);

  useLayoutEffect(() => {
    writer.current.write('Welcome to cli interface of my portfolio!');
  }, []);

  const Prompt = <span className={styles.prompt}>&nbsp;&gt;&nbsp;</span>;
  let PathToShow: any = !path.length ? <>/{Prompt}</> : <>
    {path.map((v, i) => (i == 0 ? '' : '/ ') + v.label + ' ')}
    {Prompt}
    <input
      ref={stdin}
      className={styles.stdin}
      type="text"
      aria-multiline={false}
    />
  </>;
  if (!isAnimEnded) {
    PathToShow = null;
  }

  return <div
    className={'page-body ' + styles.terminal}
    onClick={() => stdin.current.focus && stdin.current?.focus()}
  >
    <Typewriter
      style={{display: 'inline-block'}}
      delay={50}
      ref={writer}
      onAnimationEnd={() => setTimeout(() => setIsAnimEnded(true), 500)}/>
    <span className={styles.promptRow}>
      {PathToShow}
    </span>
  </div>
}

export default Terminal;