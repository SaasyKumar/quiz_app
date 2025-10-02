import { useState, useEffect } from "react";
import styles from "./../styles/questions.module.css";
function Question(props: {
  Question: string;
  Options: Array<string> | Record<string, string>;
  AnswerId: string;
  QuestionId: string;
  onOptionSelect?: Function;
}) {
  let optionsComps = [];
  let answerLabel = ["A", "B", "C", "D", "E", "F"];
  let options_list = props.Options;
  let [isAnswerSelected, answerSelected] = useState(false);
  useEffect(() => {
    answerSelected(false);
    let btns = document.querySelectorAll(
      "button[id^='" + props.QuestionId + "_']",
    );
    btns.forEach((btn) => {
      (btn as HTMLButtonElement).removeAttribute("data-correct");
    });
  }, [props.QuestionId]);
  function onOptionClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (isAnswerSelected != true) {
      let correctOptionId = props.QuestionId + "_" + props.AnswerId;
      if (ev.target.id && ev.target.id == correctOptionId) {
        (ev.target as HTMLButtonElement).setAttribute("data-correct", "true");
        answerSelected(true);
      } else {
        (ev.target as HTMLButtonElement).setAttribute("data-correct", "false");
        answerSelected(true);
        document
          .querySelector("button[id='" + correctOptionId + "']")
          ?.setAttribute("data-correct", "true");
      }
      props.onOptionSelect && props.onOptionSelect(ev.target.id);
      // if (
      //   validateAnswerFromButton(ev.target as HTMLButtonElement, props.Answer)
      // ) {
      // } else {
      // }
    }
  }
  function generateOptionButton(option_id: string, innerText: string) {
    return (
      <button
        className={styles.options}
        onClick={onOptionClick}
        id={option_id}
        tabIndex={0}
      >
        {innerText}
      </button>
    );
  }
  for (let i in options_list) {
    let innerText = options_list[i];
    let answerID;
    if (answerLabel[i]) {
      answerID = answerLabel[i];
    } else {
      answerID = i.toUpperCase();
    }
    optionsComps.push(
      generateOptionButton(props.QuestionId + "_" + answerID, innerText),
    );
  }
  return (
    <div className={styles.questions}>
      <h2>{props.Question}</h2>
      <div>{optionsComps}</div>
    </div>
  );
}
export default Question;
