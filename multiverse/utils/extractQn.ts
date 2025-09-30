export function extractFromAikenFormat(data: string) {
  const blocks = data.trim().split(/\n\s*\n/);
  let QuestionID = 1;
  const result = blocks.map((block) => {
    const lines = block.trim().split(/\r?\n/);

    const Question = lines[0].replace(/^\d+[\)\.]\s*/, "").trim();

    const optionPattern = /^([a-zA-Z])[\)\.]\s+(.+)/;
    const Options: Record<string, string> = {};

    let Answer = "";
    let explanation = "";
    for (const line of lines.slice(1)) {
      const optionMatch = line.match(optionPattern);
      if (optionMatch) {
        Options[optionMatch[1].toLowerCase()] = optionMatch[2].trim();
      }

      if (line.startsWith("Answer:")) {
        const answerMatch = line.match(/Answer:\s*([a-zA-Z])/i);
        if (answerMatch) {
          Answer = answerMatch[1].toLowerCase();
        }
      }
      if( line.startsWith("Explanation:") ){
        const explanationMatch = line.match(/Explanation:\s*(.+)/i);
        if( explanationMatch ){
          explanation = explanationMatch[1];
        }
      }
    }
    QuestionID++;
    return { QuestionID,Question, Options, Answer, explanation };
  });

  return result;
}
