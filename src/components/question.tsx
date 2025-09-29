import { useState, useEffect } from "react";
import { validateAnswerFromButton } from "../../multiverse/utils/checkAnswer.ts";
import styles from "./../styles/questions.module.css";
function Question(props: {
  Question: string;
  Options: Array<string>;
  Answer: string;
  QuestionId: string;
}) {
  let options = [];
  let options_list = props.Options;
  let [isAnswerSelected,answerSelected] = useState(false);
  useEffect(() => {
    answerSelected(false);
    let btns = document.querySelectorAll("button[id^='"+props.QuestionId+"_']");
    btns.forEach((btn) => {
      (btn as HTMLButtonElement).removeAttribute("data-correct");
    });
  }, [props.QuestionId]);
  function checkAnswer(ev: React.MouseEvent<HTMLButtonElement>) {
    if(isAnswerSelected!= true){
      if(validateAnswerFromButton(ev.target as HTMLButtonElement, props.Answer)){
        (ev.target as HTMLButtonElement).setAttribute("data-correct","true");
        answerSelected(true);
      }else{
        (ev.target as HTMLButtonElement).setAttribute("data-correct","false");
        answerSelected(true);
      }
    }
  }
  for (let i in options_list) {
    options.push(
      <button className={styles.options} onClick={checkAnswer} id={props.QuestionId+"_"+i} tabIndex={0}>
        {options_list[i]}
      </button>,
    );
  }
  return (
    <div className={styles.questions}>
      <h2>{props.Question}</h2>
      <div>{options}</div>
    </div>
  );
}
export default Question;
