import { useState, useEffect } from "react";
import styles from "./../styles/questions.module.css";
function Question(props: {
  Question: string;
  Options: Array<string> | Record<string, string>;
  AnswerId: string;
  QuestionId: string;
  onOptionSelect?: Function;
  showResultAfterSubmit?: boolean;
  optionSelected?: string;
  showResult?: boolean | false;
}) {
  let optionsComps = [];
  let answerLabel = ["A", "B", "C", "D", "E", "F"];
  let options_list = props.Options;
  let [isAnswerSelected, answerSelected] = useState(false);
  let previouslySelectedOption = props.optionSelected || "";
  useEffect(() => {
    answerSelected(false);
    let btns = document.querySelectorAll(
      "button[id^='" + props.QuestionId + "_']",
    );
    btns.forEach((btn) => {
      (btn as HTMLButtonElement).removeAttribute("data-correct");
      if ((btn as HTMLButtonElement).id !== props.optionSelected) {
        (btn as HTMLButtonElement).removeAttribute("data-selected");
      } else {
        (btn as HTMLButtonElement).setAttribute("data-selected", "true");
        if (props.showResult === true) {
          if ((btn as HTMLButtonElement).id === props.AnswerId) {
            (btn as HTMLButtonElement).setAttribute("data-correct", "true");
          } else {
            (btn as HTMLButtonElement).setAttribute("data-correct", "false");
            document
              .querySelector("button[id='" + props.AnswerId + "']")
              ?.setAttribute("data-correct", "true");
            document
              .querySelector("button[id='" + props.AnswerId + "']")
              ?.setAttribute("data-selected", "true");
          }
        }
      }
    });
  }, [props.QuestionId]);
  function onOptionClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (previouslySelectedOption) {
      document
        .querySelector("button[id='" + previouslySelectedOption + "']")
        ?.removeAttribute("data-selected");
    }
    if (isAnswerSelected != true) {
      let correctOptionId = props.AnswerId;
      const target = ev.target as HTMLButtonElement;
      if (props.showResultAfterSubmit === false) {
        if (target.id && target.id == correctOptionId) {
          (ev.target as HTMLButtonElement).setAttribute("data-correct", "true");
          answerSelected(true);
        } else {
          (ev.target as HTMLButtonElement).setAttribute(
            "data-correct",
            "false",
          );
          answerSelected(true);
          document
            .querySelector("button[id='" + correctOptionId + "']")
            ?.setAttribute("data-correct", "true");
        }
      }
      (ev.target as HTMLButtonElement).setAttribute("data-selected", "true");
      previouslySelectedOption = target.id;
      props.onOptionSelect && props.onOptionSelect(target.id);
    }
  }
  function generateOptionButton(option_id: string, innerText: string) {
    return (
      <button
        className={styles.options}
        onClick={props.showResult ? () => {} : onOptionClick}
        disabled={props.showResult ? true : undefined}
        id={option_id}
        tabIndex={0}
      >
        {innerText}
      </button>
    );
  }
  for (let i in options_list) {
    let innerText = options_list[i];
    let answerLabelID;
    if (answerLabel[i]) {
      answerLabelID = answerLabel[i];
    } else {
      answerLabelID = i.toUpperCase();
    }
    optionsComps.push(
      generateOptionButton(props.QuestionId + "_" + answerLabelID, innerText),
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
