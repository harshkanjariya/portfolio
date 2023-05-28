import {handleEnterClick} from "./keyboardEvents";

export function init() {
  handleKeyEvents();
}

function handleKeyEvents() {
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Enter':
        handleEnterClick();
    }
  });
}