import { useState } from "react";
import type { ChangeEvent } from "react";
import { extractFromAikenFormat } from "../utils/extractQn.ts";
import styles from "../styles/createQuizz.module.css";
import Quizz from "./../components/quizz.tsx";

function CreateQuizz() {
  let [inputData, setInputData] = useState("");
  let [mountQuizComp, setQuizCompMountState] = useState(false);
  let [quizData, setData] = useState<QuizData>({
    DataSet: [],
    quizTitle: "",
    Time: "0",
  });
  interface QuizData {
    DataSet: {
      Question: string;
      Options: Record<string, string>;
      Answer: string;
      explanation: string;
    }[];
    quizTitle: string;
    Time: string;
  }
  // load using paste option
  function loadData() {
    let extractedData = extractFromAikenFormat(inputData as string);
    setData({
      DataSet: extractedData,
      quizTitle: "Your Quiz Title", // Set a default title or modify as needed
      Time: "30", // Set a default time or modify as needed
    });
    setQuizCompMountState(true);
  }
  function setInput(ev: ChangeEvent<HTMLTextAreaElement>) {
    console.log(ev.target);
    setInputData(ev.target.value);
  }
  let pasteInputDiv = (
    <div className={styles.inputsdiv}>
      <div className={styles.pasteinput}>
        <textarea placeholder="Paste data here" onChange={setInput} />
        <div className={styles.load_data}>
          <button className="primarybtn" onClick={loadData}>
            Load Data
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mountQuizComp ? (
        <Quizz
          DataSet={quizData.DataSet}
          quizTitle={quizData.quizTitle}
          quizTotalTime={quizData.Time}
        />
      ) : (
        pasteInputDiv
      )}
    </>
  );
}
export default CreateQuizz;
