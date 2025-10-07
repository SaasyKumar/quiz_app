import Question from "./question.tsx";

function Result(props: {
  dataSet: Array<any>;
  answerSet: Record<string, string>;
  optionsSelected: Record<string, string>;
}) {
  let compList: Array<any> = [];
  let dataSet = props.dataSet;
  for (let data in dataSet) {
    compList.push(
      <Question
        Question={dataSet[data].Question}
        Options={dataSet[data].Options}
        AnswerId={data.toString() + "_" + props.answerSet[data.toString()]}
        QuestionId={data.toString()}
        showResult={true}
        optionSelected={
          data.toString() + "_" + props.optionsSelected[data.toString()]
        }
      ></Question>,
    );
  }
  return compList;
}

export default Result;
