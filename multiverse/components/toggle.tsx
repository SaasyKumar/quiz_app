import { useState } from "react";
import "../style/toggle.css";
function Toggle(props: {
  content: string;
  divclass: string;
  onToggle: Function;
}) {
  let [checked, toggled] = useState(false);
  let outter_class = props.divclass
    ? props.divclass + " outterdiv"
    : "outterdiv";
  let toggle_class = "toggle";
  if (checked) {
    toggle_class += " checked";
  }
  function toggle() {
    props.onToggle(!checked);
    toggled(!checked);
  }
  return (
    <div className={outter_class} onClick={toggle}>
      {props.content}
      <div className={toggle_class}>
        <div className="weball"></div>
      </div>
    </div>
  );
}
export default Toggle;
