import { useState } from "react";
import Quizz from "./components/quizz";
import CreateQuizz from "./components/createQuizz";
import "./App.css";
import "./styles/themecolor.css";
import "./styles/font.css";
import sample_data from "./../sample/vite.json";
import sample_data2 from "./../sample/qn.json";

function App() {
  let [data, setData] = useState<{
    Questions: any[];
    Title: string;
    Time?: string; // Make Time optional
  }>({ Questions: [], Title: "", Time: "" });
  let [showMainUI, setMainUIvisibiliaty] = useState(true);
  let [mountQuizComp, setQuizCompMountState] = useState(false);
  let [mountCreateComp, setCreateCompoState] = useState(false);
  let MainUI = (
    <div className="main_ui">
      <h1>Your thoughts are yours, </h1>
      <h1>but will you remember it when needed?</h1>
      <span className="appinfo">
        <span>Test</span>Quizz stores quiz on your device, you can practice it
        anytime and reinforce your memory, even offline.
      </span>
      <div className="optionsMenu">
        <button className="primarybtn mainmenubtn" onClick={loadSampleData}>
          Load Sample
        </button>
        <button
          className="primarybtn mainmenubtn"
          onClick={mountCreateComponent}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
  function mountCreateComponent() {
    setMainUIvisibiliaty(false);
    setQuizCompMountState(false);
    setCreateCompoState(true);
  }
  function loadSampleData() {
    setData(
      sample_data2 as {
        Questions: any[];
        quizTitle: string;
        quizTotalTime: string;
      }
    );
    setMainUIvisibiliaty(false);
    setQuizCompMountState(true);
    setCreateCompoState(false);
  }
  return (
    <>
      {showMainUI ? MainUI : null}
      {mountQuizComp ? (
        <Quizz
          DataSet={data.Questions}
          quizTitle={data.Title}
          quizTotalTime={data.Time}
        />
      ) : null}
      {mountCreateComp ? <CreateQuizz /> : null}
    </>
  );
}

export default App;
