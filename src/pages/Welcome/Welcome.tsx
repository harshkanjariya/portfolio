import React, {useState} from "react";
import Header from "../../components/Header/Header";
import styles from './Welcome.module.scss';
import Typing from "../../components/Welcome/Typing/Typing";
import EnvironmentSelection from "../../components/Welcome/EnvironmentSelection/EnvironmentSelection";
import {setEnvironment} from "../../utils/ui";
import {useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../core/router";

const messageList = [
  'Hello!',
  'I\'m Harsh Kanjariya',
  'Welcome to my portfolio',
];


function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  let CenterComponent;
  if (location.hash === '') {
    CenterComponent = <Typing
      messageList={messageList}
      onEnd={() => navigate('/#environments')}
    />;
  } else if (location.hash == '#typing') {
    CenterComponent = <Typing
      messageList={location.state.messageList || []}
      onEnd={() => navigate(location.state.navigate)}
    />;
  } else if (location.hash == '#environments') {
    CenterComponent = <EnvironmentSelection onSelect={(selectedEnv) => {
      setEnvironment(selectedEnv);
      if (selectedEnv == 'gui') {
        navigate('/#typing', {
          state: {
            navigate: routes.windows,
            messageList: ['Here\'s my life,\n if it was a windows.'],
          }
        })
      } else {
        navigate('/#typing', {
          state: {
            navigate: routes.cli,
            messageList: ['Here\'s my life,\n if it was a terminal.'],
          }
        })
      }
    }}/>
  }

  return <>
    <Header/>
    {CenterComponent}
  </>;
}

export default Welcome;