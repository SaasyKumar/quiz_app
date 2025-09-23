let keys = {
  ENTER: "Enter",
};

let KeyboardEventUtils = {
  isEnterKey: isEnterKey,
};

function checkKey(event: React.KeyboardEvent, key: string, modifiers: boolean) {
  if (event.key == key) {
    if (modifiers) {
      if (
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !event.shiftKey
      ) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
}

function isEnterKey(event: React.KeyboardEvent, modifiers: boolean) {
  return checkKey(event, keys.ENTER, modifiers);
}

export default KeyboardEventUtils;
