import React, {useState} from "react";
import Header from "../../components/Header/Header";
import styles from './Welcome.module.scss';
import InitialTyping from "../../components/Welcome/InitialTyping";
import EnvironmentSelection from "../../components/Welcome/EnvironmentSelection/EnvironmentSelection";
import {setEnvironment} from "../../utils/ui";
import {useNavigate} from "react-router-dom";
import {routes} from "../../core/router";


function Welcome() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  let CenterComponent;
  if (step == 0) {
    CenterComponent = <InitialTyping onEnd={() => setStep(1)}/>;
  } else if (step == 1) {
    CenterComponent = <EnvironmentSelection onSelect={(selectedEnv) => {
      setEnvironment(selectedEnv);
      navigate(routes.gui);
    }}/>
  }

  return <>
    <Header/>
    <div className={'page-body ' + styles.welcomePage}>
      {CenterComponent}
    </div>
  </>;
}

export default Welcome;