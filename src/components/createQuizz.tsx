import { useState } from "react";
import type { ChangeEvent } from "react";
import { extractFromAikenFormat } from "../../multiverse/utils/extractQn.ts";
import styles from "../styles/createQuizz.module.css";
import Quizz from "./../components/quizz.tsx";

function CreateQuizz() {
  let [inputdata, setInputData] = useState("");
  let [mountQuizComp, setQuizCompMountState] = useState(false);
  let [quizData, setData] = useState<QuizData>({ Questions: [], Title: "", Time: "0" });
  function setInput(ev: ChangeEvent<HTMLTextAreaElement>) {
    setInputData(ev.target.value);
  }
  interface QuizData {
    Questions: { question: string; answerOptions: Record<string, string>; correctAnswer: string; explanation: string; }[];
    Title: string;
    Time: string;
  }
  
  function loadData() {
    let extractedData = extractFromAikenFormat(inputdata as string);
    setData({
      Questions: extractedData,
      Title: "Your Quiz Title", // Set a default title or modify as needed
      Time: "30" // Set a default time or modify as needed
    });
    setQuizCompMountState(true);
  }
  return (
    <>
    {mountQuizComp ? (
        <Quizz Questions={quizData.Questions} Title={quizData.Title} Time={quizData.Time} />
      ) : 
      <div className={styles.inputsdiv}>
      <div className={styles.pasteinput}>
        <textarea placeholder="Paste data here" onChange={setInput} />
        <div className={styles.load_data}>
          <button className="primarybtn" onClick={loadData}>
            Load Data
          </button>
        </div>
      </div>
    </div>}
    </>
  );
}
export default CreateQuizz;
