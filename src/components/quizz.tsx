import { useState } from "react";
import timeConvert from "../../multiverse/utils/convert.ts";
import Toggle from "../../multiverse/components/toggle.tsx";
import Question from "./question.tsx";

function Quizz(props: {
  Questions: Array<any>;
  Title?: string;
  Time?: string;
}) {
  let title = props.Title;
  let timer = timeConvert(props.Time || "");
  let questions = props.Questions;
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentQn, setCurrentQn] = useState(questions[currentIndex]);
  function moveNextQn() {
    setCurrentIndex(++currentIndex);
    setCurrentQn(questions[currentIndex]);
  }
  function movePreviousQn() {
    setCurrentIndex(--currentIndex);
    setCurrentQn(questions[currentIndex]);
  }
  function onShowAnswerToggle(value: boolean) {
    console.log(value);
  }
  return (
    <>
      <div className="questions_div">
        <Toggle
          content="Show Answer"
          divclass="show_score"
          onToggle={onShowAnswerToggle}
        ></Toggle>
        <h1>{title}</h1>
        <br></br>
        <span className="timer">Time: {timer.fullMinutes()} minutes</span>
        <Question
          Question={currentQn.Question}
          Options={currentQn.Options}
          Answer={currentQn.Answer}
        ></Question>
        <br></br>
        <button
          className="primarybtn"
          onClick={movePreviousQn}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="primarybtn"
          onClick={moveNextQn}
          disabled={currentIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </>
  );
}
export default Quizz;
