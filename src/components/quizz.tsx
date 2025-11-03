import { useState, useMemo } from "react";
import { Timer } from "time_based_kits";
import { getAnswerID } from "../utils/checkAnswer.ts";
import Question from "./question.tsx";
import style from "./../styles/quizz.module.css";
import Result from "./result.tsx";
import { Setting } from "../config/settings.ts";
function Quizz(props: {
  DataSet: Array<any>;
  quizTitle?: string | "";
  quizTotalTime?: string | "";
  TimePerQuestion?: number;
}) {
  let [dataSet, updateDateSet] = useState(props.DataSet);
  let [currentDataIndex, setCurrentDataIndex] = useState(0);
  let [timer, setTimer] = useState(
    props.quizTotalTime
      ? Number(props.quizTotalTime)
      : dataSet.length * (props.TimePerQuestion || 20),
  );
  let [currentQn, setCurrentQn] = useState(dataSet[currentDataIndex]);

  let [score, setScore] = useState(0);
  let [showScore, showScoreUI] = useState(false); //FIXME: rename
  let [showFinalResult, setResult] = useState(false);
  let [recDataSet, updateRecData] = useState<string[]>([]);
  let [resetFlag, setDataRest] = useState(false);

  const answerSet = useMemo(() => {
    let set: Record<string, string> = {};
    for (let i in dataSet) {
      set[i] = getAnswerID(dataSet[i].Options, dataSet[i].Answer);
    }
    return set;
  }, [dataSet]);
  let optionsSelected = useMemo(() => {
    let set: Record<string, string> = {};
    return set;
  }, [dataSet]);

  function resetData() {
    setCurrentDataIndex(0);
    setCurrentQn(dataSet[0]);
    showScoreUI(false);
    setScore(0);
    setTimer(dataSet.length * 20);
  }
  if (resetFlag) {
    resetData();
    setDataRest(false);
  }
  function onOptionSelect(optionID: string) {
    let questionID = optionID.split("_")[0];
    let selectedID = optionID.split("_")[1];
    optionsSelected[questionID] = selectedID;
  }
  // Next and Previous button functions
  function moveNextQn() {
    setCurrentDataIndex(++currentDataIndex);
    setCurrentQn(dataSet[currentDataIndex]);
  }
  function movePreviousQn() {
    setCurrentDataIndex(--currentDataIndex);
    setCurrentQn(dataSet[currentDataIndex]);
  }
  function submitAnswers() {
    let rec: Array<any> = [];
    for (let optionSelected in optionsSelected) {
      if (optionsSelected[optionSelected] == answerSet[optionSelected]) {
        // {0: 'A', 1: 'C'} eq with {0: 'A', 1: 'B'}
        setScore(++score);
      } else {
        rec.push(dataSet[Number(optionSelected)]);
      }
    }
    updateRecData(rec);
    showScoreUI(true);
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
    <button className={"primarybtn " + style.next} onClick={submitAnswers}>
      Submit
    </button>
  );
  // End
  let quizTimer = (
    <div className="timer">
      <Timer timeInSeconds={timer} pauseEnabled={true} />
    </div>
  );
  //Score
  let scoreUI = (
    <div className={style.scoreoverlay}>
      <div className={style.scorediv}>
        <div className={style.scoretext}>
          {score}/{dataSet.length}
        </div>
        <button className={"primarybtn " + style.next} onClick={recursiveTest}>
          Recursive Test
        </button>
        {showFinalResult ? (
          <Result
            dataSet={dataSet}
            answerSet={answerSet}
            optionsSelected={optionsSelected}
          ></Result>
        ) : (
          <button className={"primarybtn " + style.next} onClick={showResult}>
            Show Result
          </button>
        )}
      </div>
    </div>
  );
  function recursiveTest() {
    updateDateSet(recDataSet);
    setDataRest(true);
  }
  function showResult() {
    setResult(true);
  }
  return (
    <>
      {showScore && scoreUI}
      <div className="dataSet_div">
        <h1>{props.quizTitle}</h1>
        {quizTimer}
        <Question
          Question={currentQn.Question}
          Options={currentQn.Options}
          AnswerId={
            currentDataIndex.toString() +
            "_" +
            answerSet[currentDataIndex.toString()]
          }
          QuestionId={currentDataIndex.toString()}
          onOptionSelect={onOptionSelect}
          showResultAfterSubmit={Setting.showResultAfterSubmit}
          optionSelected={
            currentDataIndex.toString() +
            "_" +
            optionsSelected[currentDataIndex.toString()]
          }
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
