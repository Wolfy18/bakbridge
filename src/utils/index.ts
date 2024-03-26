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

const recursiveProperties: (
  props: string[],
  value: string,
  obj?: NestedObject
) => NestedObject | undefined = (props, value, obj = {}) => {
  if (!props.length) return obj;

  const propertyKey = props.shift();

  if (propertyKey) {
    // Check if the propertyKey contains brackets indicating a list
    const match = propertyKey.match(/^(.+)\[(\d+)\]$/);
    if (match) {
      // Extract the list propertyKey and index from the match
      const listKey = match[1];
      const idx = parseInt(match[2], 10);
      // Initialize the list if it doesn't exist
      if (!Array.isArray(obj[listKey])) {
        obj[listKey] = [];
      }

      // Ensure the list element at the specified index is an object
      // @ts-expect-error the object can be nested object o string
      obj[listKey][idx] = obj[listKey][idx] || {};

      // RecursivePropertiesly call the function with the updated props and object
      // @ts-expect-error The object can be a nested object of string
      recursiveProperties(props, value, obj[listKey][idx]);
    } else {
      obj[propertyKey] = value;
    }
  }

  return obj;
};

export { insertLineBreaks, recursiveProperties };
