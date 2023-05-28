import styles from './EnvironmentSelection.module.scss';

export interface EnvironmentSelectionProps {
  className?: string,
  onSelect: (selectedEnv: string) => void,
}

function EnvironmentSelection(props: EnvironmentSelectionProps) {
  return <div className={props.className + ' ' + styles.root}>
    Please select the environment :
    <div style={{height: 30}}/>
    <div className={styles.envList}>
      <div className={styles.env} onClick={() => props.onSelect('gui')}>
        <img src="/icons/gui.svg" alt="gui"/>
        <span>graphical</span>
      </div>
      <div className={styles.env} onClick={() => props.onSelect('cli')}>
        <img src="/icons/cli.svg" alt="cli"/>
        <span>terminal</span>
      </div>
    </div>
  </div>
}

export default EnvironmentSelection