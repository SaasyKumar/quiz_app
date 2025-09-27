import { useState } from "react";
import Toggle from "../../multiverse/components/toggle.tsx";
import Timer from "../../multiverse/components/timer.tsx";
import Question from "./question.tsx";

function Quizz(props: {
  Questions: Array<any>;
  Title?: string | "";
  Time?: string | "";
  TimePerQuestion?: number | 10;
}) {
  let title = props.Title;
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
        <div className="show_score">
          <Toggle content="Show Answer" onToggle={onShowAnswerToggle}></Toggle>
        </div>
        <h1>{title}</h1>
        <br></br>
        <div className="timer">
          <Timer
            timeInSeconds={
              props.Time
                ? Number(props.Time)
                : questions.length * (props.TimePerQuestion || 10)
            }
            pauseEnabled={true}
          />
        </div>
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
