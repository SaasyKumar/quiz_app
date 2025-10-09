let validAnswerOptions = ["A", "B", "C", "D", "E", "F", "G"];
export function validateAnswerFromButton(
  answerButton: HTMLButtonElement,
  expectedAnswer: string,
) {
  let answerID = answerButton.id.split("_")[1];
  if (answerButton.textContent == expectedAnswer) {
    return true;
  } else if (answerID == expectedAnswer) {
    return true;
  } else if (
    validAnswerOptions[Number(answerID)] == expectedAnswer.toUpperCase()
  ) {
    return true;
  }
  return false;
}

export function getAnswerID(
  options: Array<string> | Record<string, string>,
  answer: string,
) {
  if (validAnswerOptions.indexOf(answer.toUpperCase()) !== -1) {
    // "a" or "A"
    return answer.toUpperCase();
  }
  if (Number(answer) && validAnswerOptions[Number(answer)] !== "undefined") {
    // "0"
    return validAnswerOptions[Number(answer)];
  }
  if (typeof options.indexOf == "function" && options.indexOf(answer) !== -1) {
    // answer string and option is a Array list
    return validAnswerOptions[options.indexOf(answer)];
  }
  for (let option in options) {
    if (options[option] == answer) {
      return option.toUpperCase();
    }
  }
  return "A";
}
