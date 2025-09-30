export function validateAnswerFromButton(
  answerButton: HTMLButtonElement,
  expectedAnswer: string,
) {
  let validAnswerOptions = ["A", "B", "C", "D", "E", "F", "G"];
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

export function validateAnswer() {
  // Implementation for general answer validation
}
