import { useState } from "react";
import type { ChangeEvent } from "react";
import { extractFromAikenFormat } from "../utils/extractQn.ts";
function CreateQuizz() {
  let [inputdata, setInputData] = useState("");
  function setInput(ev: ChangeEvent<HTMLTextAreaElement>) {
    setInputData(ev.target.value);
  }
  function loadData() {
    console.log(extractFromAikenFormat(inputdata));
  }
  return (
    <>
      <textarea placeholder="Paste data here" onChange={setInput} />
      <button onClick={loadData}>Load Data</button>
    </>
  );
}
export default CreateQuizz;
