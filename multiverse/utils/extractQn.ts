export function extractFromAikenFormat(data: string) {
  // Split by double newlines (each block is one Q&A)
  const blocks = data.trim().split(/\n\s*\n/);

  const result = blocks.map((block) => {
    const lines = block.trim().split(/\r?\n/);

    // First line = question
    const question = lines[0].replace(/^\d+[\)\.]\s*/, "").trim();

    // Options (a) b. etc.)
    const optionsRegEx = /^([a-zA-Z])[\)\.]\s+(.+)/;
    const options: Record<string, string> = {};

    let answer = "";

    for (const line of lines.slice(1)) {
      const optionMatch = line.match(optionsRegEx);
      if (optionMatch) {
        options[optionMatch[1].toLowerCase()] = optionMatch[2].trim();
      }

      // Answer line
      if (line.startsWith("Answer:")) {
        const ansMatch = line.match(/Answer:\s*([a-zA-Z])/i);
        if (ansMatch) {
          answer = ansMatch[1].toLowerCase();
        }
      }
    }

    return { question, options, answer };
  });

  return result;
}
