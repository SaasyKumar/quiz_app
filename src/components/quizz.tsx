import { useState } from "react";
import Toggle from "../../multiverse/components/toggle.tsx";
import Timer from "../../multiverse/components/timer.tsx";
import {getAnswerID} from "../../multiverse/utils/checkAnswer.ts"
import Question from "./question.tsx";
import style from "./../styles/quizz.module.css";

function Quizz(props: {
  DataSet: Array<any>;
  quizTitle?: string | "";
  quizTotalTime?: string | "";
  TimePerQuestion?: number | 10;
}) {
  let dataSet = props.DataSet;
  let optionsSelected = {};
  let result = {};
  let [currentDataIndex, setCurrentDataIndex] = useState(0);
  let [currentQn, setCurrentQn] = useState(dataSet[currentDataIndex]);
  // Next and Previous button functions
  function moveNextQn() {
    setCurrentDataIndex(++currentDataIndex);
    setCurrentQn(dataSet[currentDataIndex]);
  }
  function movePreviousQn() {
    setCurrentDataIndex(--currentDataIndex);
    setCurrentQn(dataSet[currentDataIndex]);
  }
  let previousButton = (
    <button
      className={"primarybtn " + style.previous}
      onClick={movePreviousQn}
      disabled={currentDataIndex === 0}
    >
      Previous
    </button>
  );
  let nextButton = (
    <button className={"primarybtn " + style.next} onClick={moveNextQn}>
      Next
    </button>
  );
  let submitButton = (
    <button
      className={"primarybtn " + style.next}
      onClick={() => {
        console.log("submit");
      }}
    >
      Submit
    </button>
  );
  // End
  function onShowAnswerToggle(value: boolean) {
    console.log(value);
  }
  let quizTimer = (
    <div className="timer">
      <Timer
        timeInSeconds={
          props.quizTotalTime
            ? Number(props.quizTotalTime)
            : dataSet.length * (props.TimePerQuestion || 10)
        }
        pauseEnabled={true}
      />
    </div>
  );
  return (
    <>
      <div className="dataSet_div">
        <div className="show_score">
          <Toggle content="Show Answer" onToggle={onShowAnswerToggle}></Toggle>
        </div>
        <h1>{props.quizTitle}</h1>
        {quizTimer}
        <Question
          Question={currentQn.Question}
          Options={currentQn.Options}
          AnswerId={getAnswerID(currentQn.Options,currentQn.Answer)}
          QuestionId={(dataSet.indexOf(currentQn) + 1).toString()}
        ></Question>
        <div className={style.actions}>
          {previousButton}
          {currentDataIndex === dataSet.length - 1 ? submitButton : nextButton}
        </div>
      </div>
    </>
  );
}
export default Quizz;
