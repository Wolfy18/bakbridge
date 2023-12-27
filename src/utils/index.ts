const insertLineBreaks = (inputText: string) => {
  const maxLineLength = 64;
  const words = inputText.split(/\s+/); // Split the input into words

  let currentLine = '';
  let result = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check if adding the word to the current line would exceed the limit
    if (currentLine.length + word.length > maxLineLength) {
      // If adding the word would exceed the limit, start a new line
      result += currentLine.trim() + '\n';
      currentLine = word + ' ';
    } else {
      // If adding the word would not exceed the limit, add it to the current line
      currentLine += word + ' ';
    }
  }

  // Add the last line (if any) to the result
  result += currentLine.trim();

  return result;
};

export { insertLineBreaks };
