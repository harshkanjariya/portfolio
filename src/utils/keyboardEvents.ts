const enterCallbacks: any[] = [];

export function removeEnterCallback(callback: Function) {
  if (enterCallbacks.includes(callback)) {
    let index = enterCallbacks.indexOf(callback);
    enterCallbacks.splice(index, 1);
  }
}

export function addEnterCallback(callback: Function) {
  if (!enterCallbacks.includes(callback)) {
    enterCallbacks.push(callback);
  }
}

export function handleEnterClick() {
  for (const c of enterCallbacks) {
    if (c) c();
  }
}