import Mime from 'mime';

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

const transformIntakeIntoAssetProps = (collection?: IntakeAssetProps[]) => {
  const formatted: AssetProps[] | undefined = collection?.map((obj) => {
    //attrs
    if (obj.attrs) {
      if (typeof obj.attrs === 'object' && !Array.isArray(obj.attrs)) {
        const attrs = Object.keys(obj.attrs).reduce(
          (acc: Attrs[], attr: keyof Attrs) => {
            acc.push({
              key: attr,

              // @ts-expect-error wip: working on this type error
              value: obj.attrs ? obj.attrs[attr] : null,
            });
            return acc;
          },
          []
        );

        obj.attrs = attrs;
      } else if (Array.isArray(obj.attrs)) {
        const attrs = obj.attrs?.reduce((acc: Attrs[], obj: Attrs) => {
          Object.keys(obj).map((i) => {
            acc.push({
              key: i,
              value: obj[i],
            });
          });
          return acc;
        }, []);

        obj.attrs = attrs;
      }
    }
    const {
      blockchain,
      name,
      asset_name,
      image,
      amount,
      description,
      attrs,
      files,
    } = obj as AssetProps;
    return {
      blockchain,
      name,
      asset_name,
      image,
      amount,
      description,
      attrs,
      files,
    };
  });

  return formatted;
};

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const binary = [];
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary.push(String.fromCharCode(bytes[i]));
  }

  return btoa(binary.join(''));
}

async function getContentType(input: string): Promise<string | null> {
  if (input.startsWith('http://') || input.startsWith('https://')) {
    // setPdfViewerConfig({ url: input });

    // Fetch the data from the URL
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error(`Failed to fetch the URL: ${response.statusText}`);
    }
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      return contentType;
    } else {
      const url = new URL(input);
      return Mime.getType(url.pathname);
    }
  } else if (input.startsWith('data:')) {
    // Extract MIME type part from the data URL
    // setPdfViewerConfig({ base64: input });
    return input.substring(5, input.indexOf(';'));
  } else {
    // Assume it's a raw base64 string with no extension
    return null; // MIME type cannot be determined from raw base64 without context
  }
}

export {
  insertLineBreaks,
  recursiveProperties,
  transformIntakeIntoAssetProps,
  getContentType,
  arrayBufferToBase64,
};
