export default MCQ;
function MCQ(QnObject: { Question: string; Options: Array<string> }) {
  let options = [];
  console.log("sad");
  let options_list = QnObject.Options;
  function checkAnswer(ev: React.MouseEvent<HTMLButtonElement>) {
    console.log(ev.target.textContent == QnObject.Answer);
  }
  for (let i in options_list) {
    options.push(<button onClick={checkAnswer}>{options_list[i]}</button>);
  }
  return (
    <div>
      <span>{QnObject.Question}</span>
      <br></br>
      {options}
    </div>
  );
}
