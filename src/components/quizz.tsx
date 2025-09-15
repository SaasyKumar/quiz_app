import { useState } from "react";
import timeConvert from "../utils/convert.ts";
import MCQ from "./mcq.tsx";

function Quizz(data: { Questions: Array<any>; Title?: string; Time?: string }) {
  let title = data.Title;
  let timer = timeConvert(data.Time || "");
  let questions = data.Questions;
  let [currentIndex, setCurrentIndex] = useState(0);
  let [currentQn, setCurrentQn] = useState(questions[currentIndex]);
  let QuestionUI;
  if (currentQn && currentQn.type === "MCQ") {
    QuestionUI = MCQ(currentQn);
  }
  function moveNextQn() {
    setCurrentIndex(++currentIndex);
    setCurrentQn(questions[currentIndex]);
  }
  function movePreviousQn() {
    setCurrentIndex(--currentIndex);
    setCurrentQn(questions[currentIndex]);
  }
  let next = null;
  console.log(currentIndex);
  if (currentIndex != questions.length - 1) {
    next = <button onClick={moveNextQn}>Next</button>;
  }
  let previous =
    currentIndex != 0 ? (
      <button onClick={movePreviousQn}>Previous</button>
    ) : null;
  return (
    <>
      <span>Title: {title}</span>
      <br></br>
      <span>Time: {timer.fullMinutes()} minutes</span>
      {QuestionUI}
      <br></br>
      {previous}
      {next}
    </>
  );
}
export default Quizz;
