export function validateAnswerFromButton(
  answerButton: HTMLButtonElement,
  expectedAnswer: string,
) {
  console.log(answerButton.id);
  let validAnswerOptions = ["A", "B", "C", "D", "E", "F", "G"];
  if (answerButton.textContent == expectedAnswer) {
    return true;
  } else if (answerButton.id == expectedAnswer) {
    return true;
  } else if (
    validAnswerOptions[Number(answerButton.id)] == expectedAnswer.toUpperCase()
  ) {
    return true;
  }
  return false;
}

export function validateAnswer() {
  // Implementation for general answer validation
}
