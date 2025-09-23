export function extractFromAikenFormat(data: string) {
  const blocks = data.trim().split(/\n\s*\n/);

  const result = blocks.map((block) => {
    const lines = block.trim().split(/\r?\n/);

    const question = lines[0].replace(/^\d+[\)\.]\s*/, "").trim();

    const optionPattern = /^([a-zA-Z])[\)\.]\s+(.+)/;
    const answerOptions: Record<string, string> = {};

    let correctAnswer = "";

    for (const line of lines.slice(1)) {
      const optionMatch = line.match(optionPattern);
      if (optionMatch) {
        answerOptions[optionMatch[1].toLowerCase()] = optionMatch[2].trim();
      }

      if (line.startsWith("Answer:")) {
        const answerMatch = line.match(/Answer:\s*([a-zA-Z])/i);
        if (answerMatch) {
          correctAnswer = answerMatch[1].toLowerCase();
        }
      }
    }

    return { question, answerOptions, correctAnswer };
  });

  return result;
}
