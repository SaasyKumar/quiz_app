import { useState } from "react";
import timeConvert from "../utils/convert.ts";
import Question from "./question.tsx";

function Quizz(data: { Questions: Array<any>; Title?: string; Time?: string }) {
  let title = data.Title;
  let timer = timeConvert(data.Time || "");
  let questions = data.Questions;
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
  return (
    <>
      <span>Title: {title}</span>
      <br></br>
      <span>Time: {timer.fullMinutes()} minutes</span>
      <Question
        Question={currentQn.Question}
        Options={currentQn.Options}
        Answer={currentQn.Answer}
      ></Question>
      <br></br>
      <button onClick={movePreviousQn} disabled={currentIndex === 0}>
        Previous
      </button>
      <button
        onClick={moveNextQn}
        disabled={currentIndex === questions.length - 1}
      >
        Next
      </button>
    </>
  );
}
export default Quizz;
