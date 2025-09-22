import { useState } from "react";
import "../style/toggle.css";
function Toggle(props: { content: string; onToggle: Function }) {
  let [checked, toggled] = useState(false);
  function toggle() {
    props.onToggle(!checked);
    toggled(!checked);
  }
  function onkeydown(ev: React.KeyboardEvent<HTMLDivElement>) {
    if (ev.key == "Enter" && ev.ctrlKey == false && ev.altKey == false) {
      toggle();
    }
  }
  return (
    <div className="holder" onClick={toggle} onKeyDown={onkeydown}>
      <label style={{ cursor: "pointer" }}>{props.content}</label>
      <div className="toggle" data-checked={checked} tabIndex={0}>
        <input
          type="checkbox"
          id="toggle"
          checked={checked}
          style={{ display: "none" }}
        ></input>
        <div className="weball"></div>
      </div>
    </div>
  );
}
export default Toggle;
