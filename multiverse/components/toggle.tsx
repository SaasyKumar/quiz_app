import { useState } from "react";
import styles from "../style/toggle.module.css";
import KeyboardEventUtils from "../utils/keyEvent.ts";
function Toggle(props: { content: string; onToggle: Function }) {
  let [isChecked, setCheckedState] = useState(false);
  function handleToggle() {
    props.onToggle(!isChecked);
    setCheckedState(!isChecked);
  }
  function handleKeyDown(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (KeyboardEventUtils.isEnterKey(ev, true)) {
      handleToggle();
    }
  }
  return (
    <div
      className={styles.toggle_holder}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
    >
      <label style={{ cursor: "pointer" }}>{props.content}</label>
      <div className={styles.toggle} data-checked={isChecked} tabIndex={0}>
        <input
          type="checkbox"
          id="toggle"
          checked={isChecked}
          style={{ display: "none" }}
        ></input>
        <div className={styles.toggle_indicator}></div>
      </div>
    </div>
  );
}
export default Toggle;
