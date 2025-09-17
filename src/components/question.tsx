import { checkAnswerFromButton } from "../utils/checkAnswer.ts";
function Question(QnObject: {
  Question: string;
  Options: Array<string>;
  Answer: string;
}) {
  let options = [];
  let options_list = QnObject.Options;
  function checkAnswer(ev: React.MouseEvent<HTMLButtonElement>) {
    checkAnswerFromButton(ev.target as HTMLButtonElement, QnObject.Answer);
  }
  for (let i in options_list) {
    options.push(
      <button onClick={checkAnswer} id={i}>
        {options_list[i]}
      </button>,
    );
  }
  return (
    <div>
      <span>{QnObject.Question}</span>
      <br></br>
      {options}
    </div>
  );
}
export default Question;
