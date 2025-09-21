import { checkAnswerFromButton } from "../../multiverse/utils/checkAnswer.ts";
function Question(props: {
  Question: string;
  Options: Array<string>;
  Answer: string;
}) {
  let options = [];
  let options_list = props.Options;
  function checkAnswer(ev: React.MouseEvent<HTMLButtonElement>) {
    checkAnswerFromButton(ev.target as HTMLButtonElement, props.Answer);
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
      <h2>{props.Question}</h2>
      <div>{options}</div>
    </div>
  );
}
export default Question;
