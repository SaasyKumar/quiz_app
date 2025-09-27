import { useState } from "react";
import styles from "../style/timer.module.css";
function Timer(props: {
  timeInSeconds: number;
  onTimeOut?: Function;
  pauseEnabled?: boolean | false;
}) {
  let [counter, setCounter] = useState(0);
  let [paused, setPaused] = useState(false);
  let currentTime = props.timeInSeconds - counter;
  let seconds = currentTime % 60;
  let minutes = Math.floor(currentTime / 60);
  let hours = Math.floor(currentTime / 3600);
  function incrementCounter() {
    if (paused != true) {
      setCounter(++counter);
    }
  }
  let togglePause = function () {};
  let pause = null;
  if (props.pauseEnabled == true) {
    pause = <div className={styles.pauseorplay} data-paused={paused}></div>;
    togglePause = function () {
      setPaused(!paused);
    };
  }
  if (paused != true && counter !== props.timeInSeconds) {
    setTimeout(incrementCounter, 1000);
  } else {
    props.onTimeOut && props.onTimeOut();
  }
  return (
    <div
      className={styles.timer}
      data-ticking={props.timeInSeconds - counter <= 60}
      onClick={togglePause}
      data-actions={props.pauseEnabled}
    >
      <span>
        {hours ? hours + ":" : ""}
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
      {pause}
    </div>
  );
}
export default Timer;
