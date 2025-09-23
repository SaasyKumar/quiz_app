import { useState } from "react";
import styles from "../style/timer.module.css";
function Timer(props: { timeInSeconds: number; onTimeOut?: Function }) {
  let [counter, setCounter] = useState(0);
  let currentTime = props.timeInSeconds - counter;
  let seconds = currentTime % 60;
  let minutes = Math.floor(currentTime / 60);
  let hours = Math.floor(currentTime / 3600);
  function incrementCounter() {
    setCounter(++counter);
  }
  if (counter !== props.timeInSeconds) {
    setTimeout(incrementCounter, 1000);
  } else {
    props.onTimeOut && props.onTimeOut();
  }
  return (
    <div
      className={styles.timer}
      data-ticking={props.timeInSeconds - counter <= 60}
    >
      <span>
        {hours ? hours + ":" : ""}
        {minutes}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
export default Timer;
