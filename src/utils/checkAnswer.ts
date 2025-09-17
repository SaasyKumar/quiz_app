export function checkAnswerFromButton(
  element: HTMLButtonElement,
  answer: string,
) {
  console.log(element.id);
  let options = ["A", "B", "C", "D", "E", "F", "G"];
  if (element.textContent == answer) {
    return true;
  } else if (element.id == answer) {
    return true;
  } else if (options[Number(element.id)] == answer.toUpperCase()) {
    return true;
  }
  return false;
}
export function checkAnswer() {}
