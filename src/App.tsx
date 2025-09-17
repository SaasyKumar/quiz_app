import { useState } from "react";
import Quizz from "./components/quizz";
import CreateQuizz from "./components/createQuizz";
import "./App.css";
import sample_data from "./../sample/vite.json";
import sample_data2 from "./../sample/qn.json";

function App() {
  let [data, setData] = useState<{
    Questions: any[];
    Title: string;
    Time: string;
  }>({ Questions: [], Title: "", Time: "" });
  let [showMainUI, setMainUIvisibiliaty] = useState(true);
  let [mountQuizComp, setQuizCompMountState] = useState(false);
  let [mountCreateComp, setCreateCompoState] = useState(false);
  let MainUI = (
    <>
      <button>Show score at the last</button>
      <button onClick={loadSampleData}>Load Sample</button>
      <button onClick={mountCreateComponent}>Create Quiz</button>
    </>
  );
  function mountCreateComponent() {
    setMainUIvisibiliaty(false);
    setQuizCompMountState(false);
    setCreateCompoState(true);
  }
  function loadSampleData() {
    setData(sample_data2 as { Questions: any[]; Title: string; Time: string });
    setMainUIvisibiliaty(false);
    setQuizCompMountState(true);
    setCreateCompoState(false);
  }
  return (
    <>
      {showMainUI ? MainUI : null}
      {mountQuizComp ? (
        <Quizz Questions={data.Questions} Title={data.Title} Time={data.Time} />
      ) : null}
      {mountCreateComp ? <CreateQuizz /> : null}
    </>
  );
}

export default App;
