import { useState } from "react";
import Quizz from "./components/quizz";
import "./App.css";
import sample_data from "./../sample/vite.json";

function App() {
  let [data, setData] = useState<{
    Questions: any[];
    Title: string;
    Time: string;
  }>({ Questions: [], Title: "", Time: "" });
  let [showMainUI, setMainUIvisibiliaty] = useState(true);
  let MainUI = (
    <>
      <button>Show score at the last</button>
      <button onClick={loadSampleData}>Load Sample</button>
    </>
  );
  function loadSampleData() {
    setData(sample_data as { Questions: any[]; Title: string; Time: string });
    setMainUIvisibiliaty(false);
  }
  return (
    <>
      {showMainUI ? (
        MainUI
      ) : (
        <Quizz Questions={data.Questions} Title={data.Title} Time={data.Time} />
      )}
    </>
  );
}

export default App;
